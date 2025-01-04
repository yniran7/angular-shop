import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgFor } from '@angular/common';
import {
  MatCardTitle,
  MatCardHeader,
  MatCardSubtitle,
  MatCard,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  imports: [
    NgFor,
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatIcon,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  @Input() set category(category: string) {
    if (category) {
      this.productService
        .getProductsByCategory(category)
        .subscribe((products) => {
          this.products = products.products;
        });
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  increment(product: any) {
    this.cartService.increment(product);
  }

  decrement(product: any) {
    this.cartService.decrement(product);
  }
}
