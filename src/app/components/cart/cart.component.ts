import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    MatCard,
    MatCardContent,
    MatCardActions,
    NgFor,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['product', 'quantity', 'price', 'actions'];

  @Input() cart: any[] = [];
  @Input() userId: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
    });
  }
  removeItem(item: any) {
    this.cartService.removeFromCart(item);
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  saveCart() {
    this.productService.saveCart(this.cart, this.userId).subscribe(() => {
      alert('Cart saved!');
    });
  }
}
