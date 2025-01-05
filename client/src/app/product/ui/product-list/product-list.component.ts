import { Component, HostListener, inject, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProductService } from '../../product.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductComponent, MatProgressSpinner],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  readonly productService = inject(ProductService);

  @HostListener('window:scroll', [])
  onScroll() {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = documentHeight - 200;

    if (scrollPosition >= threshold) {
      this.productService.page$.next();
    }
  }
}
