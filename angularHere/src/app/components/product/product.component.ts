import {Component, Input } from '@angular/core';

interface Product {
  img: string;
  name: string;
  description: string;
  price: number;
  quantity?: number
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;
  quantity: number = 0;

  constructor() { }

  decrement() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  increment() {
    this.quantity++;
  }

  onAdd() {
    const cartItems = localStorage.getItem('cartItems');
    let cart = cartItems ? JSON.parse(cartItems) : [];
    const existingItem = cart.find((item: Product) => item.name === this.product.name);
    if (existingItem) {
      existingItem.quantity += this.quantity;
    } else {
      cart.push({ ...this.product, quantity: this.quantity });
    }
    localStorage.setItem('cartItems', JSON.stringify(cart));
    this.quantity = 0; // reset the quantity after adding to cart
  }

}
