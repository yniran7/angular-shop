import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, switchMap } from 'rxjs';
import { Product } from '../../models/product';
import { ShopRemoteService } from '../shop.remote.service';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  userId: string;
  cart: CartItem[];
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly state = signal<CartState>({ userId: 'yuval', cart: [] });

  private readonly shopRemoteService = inject(ShopRemoteService);
  
  cart = computed(() => this.state().cart);
  userId = computed(() => this.state().userId);
  private loadCart$ = this.shopRemoteService.getCart(this.userId());

  
  add$ = new Subject<Product & { quantity?: number }>();
  decrement$ = new Subject<Product>();
  removeItem$ = new Subject<Product>();
  save$ = new Subject<void>();

  constructor() {
    this.loadCart$.pipe(takeUntilDestroyed()).subscribe(({ products }) => {
      this.state.update((prevState) => ({ ...prevState, cart: products }));
    });

    this.add$
      .pipe(takeUntilDestroyed())
      .subscribe((product: Product & { quantity?: number }) => {
        this.state.update((prevState) => {
          const existingProduct = prevState.cart.find(
            (item) => item.name === product.name
          );

          if (existingProduct) {
            existingProduct.quantity += product.quantity ?? 1;
          } else {
            prevState.cart.push({
              ...product,
              quantity: product.quantity ?? 1,
            });
          }

          return {
            ...prevState,
            cart: prevState.cart,
          };
        });
      });

    this.decrement$.pipe(takeUntilDestroyed()).subscribe((product: Product) => {
      this.state.update((prevState) => {
        const item = prevState.cart.find((p) => p.name === product.name);

        if (item && item.quantity > 1) {
          item.quantity--;
        } else if (item && item.quantity === 1) {
          prevState.cart.filter(
            (currentProduct) => currentProduct.name !== product.name
          );
        }

        return {
          ...prevState,
          cart: prevState.cart,
        };
      });
    });

    this.removeItem$
      .pipe(takeUntilDestroyed())
      .subscribe((product: Product) => {
        this.state.update((prevState) => ({
          ...prevState,
          cart: prevState.cart.filter(
            (currentProduct) => currentProduct.name !== product.name
          ),
        }));
      });

    this.save$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.shopRemoteService
        .saveCart(this.cart(), this.userId())
        .subscribe(() => alert('Cart saved!'));
    });
  }

  getTotal(): number {
    return this.cart().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getTotalProducts(): number {
    return this.cart().reduce((sum, item) => sum + item.quantity, 0);
  }

  // saveCart() {
  //   this.shopRemoteService
  //     .saveCart(this.cart(), this.userId())
  //     .subscribe(() => alert('Cart saved!'));
  // }
}
