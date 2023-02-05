import { Injectable } from '@angular/core';
import { Cart } from 'src/types/cart';

@Injectable({
  providedIn: 'root',
})
export class ProductCartService {
  constructor() {}

  carts: Cart[] = [];

  addToCart(item: Cart) {
    // search if item already exists in cart
    const product = this.carts.findIndex((cart) => cart.id === item.id);
    // To avoid NaN quantity
    if (isNaN(item.quantity)) {
      item.quantity = 1;
    }
    if (product !== -1) {
      // if item exists in cart, increase quantity
      this.carts[product].quantity += item.quantity;
      return;
    }
    this.carts.push(item);
  }
  getCart() {
    return this.carts;
  }
  removeItem(id: number) {
    const product = this.carts.findIndex((cart) => cart.id === id);
    this.carts.splice(product, 1);
  }
  calculateTotal() {
    let total = 0;
    this.carts.forEach((cart) => {
      total += cart.price * cart.quantity;
    });
    return total;
  }
  clearCart() {
    this.carts = [];
  }
}
