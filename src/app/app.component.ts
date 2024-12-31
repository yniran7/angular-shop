import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  imports: [
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    CartComponent,
    HttpClientModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cart: any[] = [];

  updateCart(products: any[]) {
    this.cart = products.filter((p) => p.quantity > 0);
  }

  getTotalProducts() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}
