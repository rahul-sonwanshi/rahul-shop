import { ShoppingCart } from './../models/shopping-cart';
import { Product } from './../models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
    .pipe(
      map(item => {           // <== new way of chaining
        let data = item.payload.val();
        let key = item.payload.key;
        return {key, data} as ShoppingCart;           // or {key, ...data} in case data is Obj
      }),
      map(xItem => {
        return xItem = new ShoppingCart(xItem.data);
      })
    );
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getItem(cartId, productId) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId;

    let result = await this.create();      
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1))
      .subscribe((item: any) => {
        let quantity = ((item.payload.val()) ? (item.payload.val().quantity || 0) : 0) + change ;
        if(quantity === 0) item$.remove();
        else item$.update({ 
          product: product,
          quantity: quantity
        })
      });
  }

}
