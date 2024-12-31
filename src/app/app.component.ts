import { Component } from '@angular/core';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
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

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getCart(this.userId).subscribe((cart: any) => {
      console.log(cart);
      this.cart = cart?.['products'];
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
