import { Product } from './product';

export class ShoppingCartItem {

    constructor(public product: Product, public quantity: number){}

    get totalPrice() { return this.product.data.price * this.quantity; }
}