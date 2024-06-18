import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';

interface Product {
  img: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  imports: [CommonModule],
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  cartItems: Product[] = [];
  filteredCartItems: Product[] = [];

  constructor() {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    if (typeof localStorage !== 'undefined') {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        this.cartItems = JSON.parse(storedCartItems);
        this.filteredCartItems = [...this.cartItems];
      }
    } else {
      console.error('localStorage is not available');
    }
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => item.name !== product.name);
    this.updateCartStorage();
    this.filterCartItems({ target: { value: '' } });
  }

  getTotal() {
    return this.filteredCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  updateCartStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.filteredCartItems = [...this.cartItems];
    } else {
      console.error('localStorage is not available');
    }
  }

  clearCart() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('cartItems');
      this.cartItems = [];
      this.filteredCartItems = [];
    } else {
      console.error('localStorage is not available');
    }
  }

  increaseQuantity(product: Product) {
    const cartItem = this.cartItems.find(item => item.name === product.name);
    if (cartItem) {
      cartItem.quantity++;
      this.updateCartStorage();
      this.filterCartItems({ target: { value: '' } });
    }
  }

  decreaseQuantity(product: Product) {
    const cartItem = this.cartItems.find(item => item.name === product.name);
    if (cartItem && cartItem.quantity > 0) {
      cartItem.quantity--;
      if (cartItem.quantity === 0) {
        this.removeFromCart(cartItem);
      } else {
        this.updateCartStorage();
        this.filterCartItems({ target: { value: '' } });
      }
    }
  }

  filterCartItems(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredCartItems = this.cartItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }
}
