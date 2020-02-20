import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../services/shopping-cart.service';

import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input("product") product: Product;
  @Input("show-actions") showActions = true;
  @Input("shopping-cart") shoppingCart: ShoppingCart; 

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }

  getQuantity() {
    if(!this.shoppingCart.data.items) return 0;

    let item = this.shoppingCart.data.items[this.product.key];
    return item ? item.quantity : 0;
  }
  
}
