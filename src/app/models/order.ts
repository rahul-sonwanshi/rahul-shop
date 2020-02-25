import { ShoppingCart } from './shopping-cart';
import { ShoppingCartItem } from './shopping-cart-item';

export class Order {
    datePlaced: number;

    constructor(
        public userId: string,
        public shipping: any, 
        public items: ShoppingCartItem[]) {

        this.datePlaced = new Date().getTime();
        for (let index = 0; index < items.length; index++)
            items[index] = new ShoppingCartItem(items[index].product, items[index].quantity);
        
    }
}