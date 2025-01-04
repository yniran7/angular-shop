import { Component, Input, OnInit, signal } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { CartItem, CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  imports: [
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    MatCard,
    MatCardContent,
    MatCardActions,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['product', 'quantity', 'price', 'actions'];

  cart = signal<CartItem[]>([]);
  @Input() userId: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((cart: CartItem[]) => {
      this.cart.set(cart);
    });
  }
  removeItem(item: any) {
    this.cartService.removeFromCart(item);
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  saveCart() {
    this.productService
      .saveCart(this.cartService.getCart(), this.userId)
      .subscribe(() => {
        alert('Cart saved!');
      });
  }
}
