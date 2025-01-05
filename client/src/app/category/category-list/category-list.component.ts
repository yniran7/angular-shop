import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent {
  constructor(public categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.loadCategories$.next();
  }
}
