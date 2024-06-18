import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './views/products/products.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { TableComponent } from './views/table/table.component';

export const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'table', component: TableComponent },
];