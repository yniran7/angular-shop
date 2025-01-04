import { Component, HostListener, Input } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  imports: [
    MatProgressSpinner,
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    MatCard,
    MatCardActions,
    MatIcon,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: Product[] = [];
  page = 1;
  pageSize = 5;
  isLoading = false;
  retrievedAllProducts = false;
  _category = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  @Input() set category(category: string) {
    if (category && category != this.category) {
      this.page = 1;
      this.products = [];
      this._category = category;
      this.retrievedAllProducts = false;
      this.loadProducts(category);
    }
  }

  get category(): string {
    return this._category;
  }

  loadProducts(category?: string) {
    if (this.isLoading || this.retrievedAllProducts) return;
    this.isLoading = true;

    this.productService
      .getProductsByCategory(
        category ?? this.category,
        this.page,
        this.pageSize
      )
      .subscribe((products) => {
        if (products.products.length === 0) {
          this.retrievedAllProducts = true;
          this.isLoading = false;
          return;
        }
        this.products = [...this.products, ...products.products];

        this.page++;
        this.isLoading = false;
      });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = documentHeight - 200;

    if (scrollPosition >= threshold && !this.isLoading) {
      this.loadProducts();
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  increment(product: Product) {
    this.cartService.increment(product);
  }

  decrement(product: Product) {
    this.cartService.decrement(product);
  }
}
