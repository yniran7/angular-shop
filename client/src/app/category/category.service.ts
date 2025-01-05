import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, filter, Subject, switchMap } from 'rxjs';
import { ShopRemoteService } from '../shop.remote.service';

interface CategoryState {
  currentCategory?: string;
  categories: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly state = signal<CategoryState>({
    currentCategory: undefined,
    categories: [],
  });

  currentCategory = computed(() => this.state().currentCategory);
  categories = computed(() => this.state().categories);

  loadCategories$ = new Subject<void>();

  public readonly category$ = new BehaviorSubject<string | undefined>(
    this.currentCategory()
  );

  private readonly shopRemoteService = inject(ShopRemoteService);

  constructor() {
    this.loadCategories$
      .pipe(
        takeUntilDestroyed(),
        switchMap(() => this.shopRemoteService.getCategories())
      )
      .subscribe(({ categories }) => {
        this.state.update((prevState) => ({
          ...prevState,
          categories,
        }));
      });

    this.category$.pipe(takeUntilDestroyed()).subscribe((category) => {
      this.state.update((prevState) => ({
        ...prevState,
        currentCategory: category,
      }));
    });
  }
}
