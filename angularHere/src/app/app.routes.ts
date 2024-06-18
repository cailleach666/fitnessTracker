import { Routes } from '@angular/router';
import { ProductsComponent } from './views/products/products.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { TableComponent } from './components/table/table.component';

export const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'table', component: TableComponent },
];
