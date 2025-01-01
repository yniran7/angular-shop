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
  @Output() cartUpdated = new EventEmitter<any[]>();

  constructor(private productService: ProductService, private cartService: CartService) {}

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
    product.quantity = (product.quantity || 0) + 1;
    // this.cartUpdated.emit(this.products);
    this.cartService.addToCart(product);
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
