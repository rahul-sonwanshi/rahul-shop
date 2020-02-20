import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    key: string;

    constructor(public data: { items: { [key: string]: ShoppingCartItem } }){
      // Here key is productId
      for(let key in data.items) {
        data.items[key] = new ShoppingCartItem(data.items[key].product, data.items[key].quantity);
      }
    }

    get totalPrice() {
      let sum = 0;
      for(let key in this.data.items)
        sum += this.data.items[key].totalPrice;
      
      return sum;
    }
    
    get totalItemsCount() {
      let count = 0;
      for(let productId in this.data.items)
        count += this.data.items[productId].quantity;
      return count;
    }
}