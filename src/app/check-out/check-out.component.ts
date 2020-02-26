import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart: ShoppingCart;
  cartSubscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe( cart => this.cart = cart);
    
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
 
}
