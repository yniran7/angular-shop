import { Component } from '@angular/core';
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
  category: string = '';
  cart: any[] = [];
  userId: string = 'yuval';

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit() {
    this.productService.getCart(this.userId).subscribe((cart: any) => {
      this.cart = cart?.['products'];
      this.cartService.addToCart(this.cart)
    });
  }

  updateCategory(selectedCategory: string) {
    this.category = selectedCategory;
  }

  updateCart(updatedProducts: any[]) {
    this.cart = updatedProducts.filter((p) => p.quantity > 0);
  }

  getTotalProducts() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}
