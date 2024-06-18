import {Component, OnInit} from '@angular/core';
import {ProductComponent} from "../../components/product/product.component";
import {NgForOf} from "@angular/common";
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
    SearchComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products = [
    { img: 'path/to/image.jpg', name: 'Chicken', description: 'Chicken with rice', price: 20},
    { img: 'path/to/image.jpg', name: 'Beef', description: 'Steak with potatoes', price: 27},
    { img: 'path/to/image.jpg', name: 'Caesar Salad', description: 'With chicken', price: 15.50},
    { img: 'path/to/image.jpg', name: 'Chicken', description: 'Grilled chicken', price: 23},
    { img: 'path/to/image.jpg', name: 'Soup', description: 'Vegan soup', price: 10}
  ];

  constructor() { }

  filteredProducts = [...this.products];

  ngOnInit() {
    this.filteredProducts = [...this.products];
  }

  handleSearch(searchTerm: string) {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
