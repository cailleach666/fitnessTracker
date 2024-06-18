import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {NgForOf} from "@angular/common";

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
  imports: [
    NgForOf
  ],
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  cart: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  decrement(product: Product) {
    this.productService.updateQuantity(product, product.quantity - 1);
  }

  increment(product: Product) {
    this.productService.updateQuantity(product, product.quantity + 1);
  }

  remove(product: Product) {
    this.productService.removeFromCart(product);
  }
}
