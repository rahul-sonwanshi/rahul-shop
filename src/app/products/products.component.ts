import { ShoppingCartService } from './../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] =[]; // please *** Initialize!!!
  filteredProducts: Product[]=[];
  cart: any;
  
  category: string;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);

    this.productService.getAll().pipe(
      switchMap( products => { 
        this.products = products;
        return this.route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
        console.log(this.products);
        
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.data.category === this.category) :
          this.products;
      });    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
