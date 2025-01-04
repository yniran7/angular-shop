import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product';

export interface CartItem extends Product {
  quantity: number
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cart.asObservable();

  constructor() {}

  getCart() {
    return this.cart.getValue();
  }

  addToCart(product: Product, quantity = 1) {
    const cart = this.getCart();
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    this.cart.next(cart);
  }

  removeFromCart(product: Product): void {
    let cart = this.getCart();
    cart = cart.filter((item) => item.name !== product.name);
    this.cart.next(cart);
  }

  increment(product: Product): void {
    const cart = this.getCart();
    const item = cart.find((p) => p.name === product.name);
    if (item) item.quantity++;
    this.cart.next(cart);
  }

  decrement(product: Product): void {
    const cart = this.getCart();
    const item = cart.find((p) => p.name === product.name);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else if (item && item.quantity === 1) {
      this.removeFromCart(product);
    }
    this.cart.next(cart);
  }

  getTotal(): number {
    return this.getCart().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getTotalProducts(): number {
    return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
  }
}
