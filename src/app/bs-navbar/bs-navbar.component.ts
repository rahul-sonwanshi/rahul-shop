import { Observable } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();

    // We don't want to unsubscribe from this as multi tab with dynamically change the count and
    // we want that ;)
  }

  logout() {
    this.auth.logout();
  }


}
