import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();

  constructor() {}

  getCart() {
    return this.cart.getValue();
  }

  addToCart(product: any) {
    const cart = this.getCart();
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    this.cart.next(cart); // Notify all subscribers
  }

  removeFromCart(product: any) {
    let cart = this.getCart();
    cart = cart.filter((item) => item.name !== product.name);
    this.cart.next(cart); // Notify all subscribers
  }

  increment(product: any) {
    const cart = this.getCart();
    const item = cart.find((p) => p.name === product.name);
    if (item) item.quantity++;
    this.cart.next(cart); // Notify all subscribers
  }

  decrement(product: any) {
    const cart = this.getCart();
    const item = cart.find((p) => p.name === product.name);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else if (item && item.quantity === 1) {
      this.removeFromCart(product);
    }
    this.cart.next(cart); // Notify all subscribers
  }

  getTotal() {
    return this.getCart().reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
