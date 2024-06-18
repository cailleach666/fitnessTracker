import {Component, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() addProduct = new EventEmitter<Product>();
  quantity: number = 0;

  decrement() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  increment() {
    this.quantity++;
  }

  constructor() { }

  onAdd() {
    if (this.quantity > 0) {
      const productToAdd: Product = { ...this.product, quantity: this.quantity };
      this.addProduct.emit(productToAdd);
      this.quantity = 0;
    }
  }
}
