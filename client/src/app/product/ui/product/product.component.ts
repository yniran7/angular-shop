import { Component, inject, Input } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Product } from '../../../../models/product';
import { CartService } from '../../../cart/cart.service';

@Component({
  selector: 'app-product',
  imports: [
    MatCard,
    MatIcon,
    MatCardActions,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;

  public readonly cartService = inject(CartService);
}
