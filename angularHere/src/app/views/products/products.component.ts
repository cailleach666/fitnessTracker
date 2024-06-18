import {Component, OnInit} from '@angular/core';
import {ProductComponent} from "../../components/product/product.component";
import {NgForOf, NgIf} from "@angular/common";
import { FormsModule } from '@angular/forms';
import {SearchComponent} from "../../components/search/search.component";

interface Product {
  img: string;
  name: string;
  description: string;
  price: number;
  quantity?: number
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductComponent,
    NgForOf,
    SearchComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products = [
    { img: 'path/to/image.jpg', name: 'Chicken', description: 'Chicken with rice', price: 20},
    { img: 'path/to/image.jpg', name: 'Beef', description: 'Steak with potatoes', price: 27},
    { img: 'path/to/image.jpg', name: 'Caesar Salad', description: 'With chicken', price: 15.50},
    { img: 'path/to/image.jpg', name: 'Chick', description: 'Grilled chicken', price: 23},
    { img: 'path/to/image.jpg', name: 'Soup', description: 'Vegan soup', price: 10}
  ];

  constructor() { }

  filteredProducts = [...this.products];
  isNewProductFormVisible = false;
  newProduct: Product = { img: '', name: '', description: '', price: 0, quantity: 0 };


  ngOnInit() {
    this.filteredProducts = [...this.products];
    this.loadProducts();
  }

  handleSearch(searchTerm: string) {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  showNewProductForm() {
    this.isNewProductFormVisible = true;
  }

  addNewProduct() {
    this.products.push({ ...this.newProduct });
    this.updateLocalStorage();
    this.filteredProducts = [...this.products];
    this.isNewProductFormVisible = false;
    this.newProduct = { img: '', name: '', description: '', price: 0, quantity: 0 };
  }

  cancelNewProduct() {
    this.isNewProductFormVisible = false;
    this.newProduct = { img: '', name: '', description: '', price: 0, quantity: 0 };
  }

  loadProducts() {
    if (typeof localStorage !== 'undefined') {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        this.products = JSON.parse(storedProducts);
        this.filteredProducts = [...this.products];
      }
    } else {
      console.error('localStorage is not available');
    }
  }

  updateLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('products', JSON.stringify(this.products));
    } else {
      console.error('localStorage is not available');
    }
  }

}
