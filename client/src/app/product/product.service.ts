import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, filter, switchMap } from 'rxjs';
import { Product } from '../../models/product';
import { CategoryService } from '../category/category.service';
import { IGetProductsByCategoryResponse } from '../interfaces/getProductsByCategoryResponse';
import { ShopRemoteService } from '../shop.remote.service';

interface ProductState {
  currentCategory: string;
  currentPage: number;
  products: Product[];
  isLoading: boolean;
  loadedAllProducts: boolean;
}

const PAGE_SIZE = 5;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _categoryService = inject(CategoryService);
  private readonly _shopRemoteService = inject(ShopRemoteService);

  public readonly page$ = new BehaviorSubject<number | void>(0);
  public readonly category$ = this._categoryService.category$;

  private readonly state = signal<ProductState>({
    products: [],
    currentCategory: '',
    currentPage: 1,
    isLoading: false,
    loadedAllProducts: false,
  });

  products = computed(() => this.state().products);
  isLoading = computed(() => this.state().isLoading);
  loadedAllProducts = computed(() => this.state().loadedAllProducts);

  constructor() {
    this.page$
      .pipe(
        takeUntilDestroyed(),
        filter(
          () =>
            !!this._categoryService.currentCategory &&
            !this.isLoading() &&
            !this.loadedAllProducts()
        ),
        switchMap((page) => {
          this.state.update((prevState) => ({
            ...prevState,
            isLoading: true,
          }));

          return this._shopRemoteService.getProductsByCategory(
            this._categoryService.currentCategory() as string,
            page ?? this.state().currentPage + 1,
            PAGE_SIZE
          );
        })
      )
      .subscribe(({ products }: IGetProductsByCategoryResponse) => {
        this.state.update((prevState) => ({
          ...prevState,
          products: [...prevState.products, ...products],
          currentPage: this.state().currentPage + 1,
          isLoading: false,
          loadedAllProducts: products.length === 0,
        }));
      });

    this.category$.pipe(takeUntilDestroyed()).subscribe((category) => {
      if (category && category !== this.state().currentCategory) {
        this.state.update((prevState) => ({
          ...prevState,
          currentPage: 1,
          currentCategory: category,
          products: [],
          loadedAllProducts: false,
        }));
        this.page$.next(1);
      }
    });
  }
}
