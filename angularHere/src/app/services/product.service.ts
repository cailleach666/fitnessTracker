import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Product {
  img: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cart = new BehaviorSubject<Product[]>([]);

  addToCart(product: Product) {
    const currentCart = this.cart.value;
    const existingProduct = currentCart.find(p => p.name === product.name);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      currentCart.push(product);
    }
    this.cart.next(currentCart);
  }

  getCart() {
    return this.cart.asObservable();
  }

  updateQuantity(product: Product, quantity: number) {
    const currentCart = this.cart.value;
    const existingProduct = currentCart.find(p => p.name === product.name);
    if (existingProduct) {
      existingProduct.quantity = quantity;
      if (existingProduct.quantity <= 0) {
        this.removeFromCart(existingProduct);
      }
      this.cart.next(currentCart);
    }
  }

  removeFromCart(product: Product) {
    const currentCart = this.cart.value.filter(p => p.name !== product.name);
    this.cart.next(currentCart);
  }
}
