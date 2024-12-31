import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgFor],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories.categories;
    });
  }

  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }
}
