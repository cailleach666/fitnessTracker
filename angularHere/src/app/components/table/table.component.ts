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

  constructor() {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    if (typeof localStorage !== 'undefined') {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        this.cartItems = JSON.parse(storedCartItems);
      }
    } else {
      console.error('localStorage is not available');
    }
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => item.name !== product.name);
    this.updateCartStorage();
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  updateCartStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    } else {
      console.error('localStorage is not available');
    }
  }

  clearCart() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('cartItems');
      this.cartItems = [];
    } else {
      console.error('localStorage is not available');
    }
  }

  increaseQuantity(product: Product) {
    const cartItem = this.cartItems.find(item => item.name === product.name);
    if (cartItem) {
      cartItem.quantity++;
      this.updateCartStorage();
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
      }
    }
  }
}
