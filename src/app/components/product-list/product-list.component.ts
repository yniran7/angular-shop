import { Component, Output, EventEmitter } from '@angular/core';
import {NgFor} from '@angular/common'

@Component({
  imports: [NgFor],
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Output() cartUpdated = new EventEmitter<any>();
  products = [
    { name: 'Tomato', price: 1, quantity: 0 },
    { name: 'Cucumber', price: 2, quantity: 0 }
  ];

  addToCart(product: any) {
    product.quantity++;
    this.cartUpdated.emit(this.products);
  }

  increment(product: any) {
    product.quantity++;
    this.cartUpdated.emit(this.products);
  }

  decrement(product: any) {
    if (product.quantity > 0) {
      product.quantity--;
      this.cartUpdated.emit(this.products);
    }
  }
}
