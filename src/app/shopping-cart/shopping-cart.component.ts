import { ShoppingCartItem } from './../models/shopping-cart-item';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  cart: ShoppingCart;
  dataSource;
  subscription: Subscription;
  displayedColumns: string[] = ['productImage', 'product', 'quantity', 'price'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart = cart;
      this.initializeTable();
    });
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initializeTable() {
    if(!this.cart.data.items) {
      this.dataSource = null;
      return;
    }
    this.dataSource = new MatTableDataSource<ShoppingCartItem>(Object.values(this.cart.data.items)); 
    //Object.values() return values in array format from Object
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
  }

  addToCart(cartItem: ShoppingCartItem) {
    this.shoppingCartService.addToCart(cartItem.product);
  }

  removeFromCart(cartItem: ShoppingCartItem) {
    this.shoppingCartService.removeFromCart(cartItem.product);
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

}
