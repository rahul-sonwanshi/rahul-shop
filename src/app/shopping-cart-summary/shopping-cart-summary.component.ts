import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements AfterViewInit {
  @Input('cart') cart: ShoppingCart;
  cartItems;

  ngAfterViewInit() {
    // this.cartItems = Object.values(this.cart.data.items);
  }

}
