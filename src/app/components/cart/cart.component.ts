import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [NgFor],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  @Input() cart: any[] = [];
  @Input() userId: string = '';

  constructor(private productService: ProductService) {}

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeItem(item: any) {
    const index = this.cart.indexOf(item);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
  }

  saveCart() {
    this.productService.saveCart(this.cart, this.userId).subscribe(() => {
      alert('Cart saved!');
    });
  }
}
