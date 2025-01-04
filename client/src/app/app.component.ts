import { Component, signal } from '@angular/core';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    MatToolbarModule,
    FooterComponent,
    ProductListComponent,
    CartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  category = signal<string>('');
  userId = signal<string>('yuval');

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getCart(this.userId()).subscribe((cart: any) => {
      cart?.products.forEach((product: any) => {
        this.cartService.addToCart(product, product.quantity);
      });
    });
  }

  updateCategory(selectedCategory: string) {
    this.category.set(selectedCategory);
  }

  getTotalProducts() {
    return this.cartService.getTotalProducts();
  }
}
