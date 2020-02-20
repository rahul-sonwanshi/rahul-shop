import { Product } from './../../models/product';
import { Subscription } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  product = {};
  subscription: Subscription;
  dataSource;
  displayedColumns: string[] = ['title', 'price', 'edit'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll().subscribe(products =>  {
      this.products = products;
      this.initializeTable(this.products);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initializeTable(products) {
    this.dataSource = new MatTableDataSource<Product>(products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource); 
  }

  filter(query: string) {
    let filteredProducts = (query) ? 
      this.products.filter(p => p.data.title.toLowerCase().includes(query.toLowerCase())) : 
      this.products;
    
    this.initializeTable(filteredProducts);
  }

}

