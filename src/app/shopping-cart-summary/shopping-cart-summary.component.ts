import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  cart: ShoppingCart;
  cartItems;
  cartSubscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe( cart => {
      this.cart = cart;
      this.cartItems = Object.values(this.cart.data.items);
    });
  }

}
