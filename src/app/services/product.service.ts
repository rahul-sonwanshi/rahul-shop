import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges()
    .pipe(
      map(items => {           // <== new way of chaining
        return items.map(a => {
          let data = a.payload.val();
          let key = a.payload.key;
          return {key, data} as Product;           // or {key, ...data} in case data is Obj
        });
    }));
  }

  get(productId) {
    return this.db.object('/products/' + productId).snapshotChanges()
    .pipe(
      map(item => {           // <== new way of chaining
        let data = item.payload.val();
        let key = item.payload.key;
        return {key, data} as Product;           // or {key, ...data} in case data is Obj
    }));
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
