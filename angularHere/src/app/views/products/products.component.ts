import {Component, OnInit} from '@angular/core';
import {ProductComponent} from "../../components/product/product.component";
import {NgForOf} from "@angular/common";
import {SearchComponent} from "../../components/search/search.component";
import { ProductService } from '../../services/product.service';

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
    SearchComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  products = [
    { img: 'path/to/image.jpg', name: 'Chicken', description: 'hu', price: 19.99},
    { img: 'path/to/image.jpg', name: 'Beef', description: 'hu', price: 19.99},
    { img: 'path/to/image.jpg', name: 'Salad', description: 'hu', price: 19.99},
    { img: 'path/to/image.jpg', name: 'Chicken', description: 'hu', price: 19.99},
    { img: 'path/to/image.jpg', name: 'Soup', description: 'hu', price: 19.99 }
  ];

  constructor(private productService: ProductService) { }

  filteredProducts = [...this.products];

  ngOnInit() {
    this.filteredProducts = [...this.products];
  }

  handleSearch(searchTerm: string) {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  handleAddProduct(product: { img: string; name: string; description: string; price: number; quantity: number }) {
    this.productService.addToCart(product);
  }

}
