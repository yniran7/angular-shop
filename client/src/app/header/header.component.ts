import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategoryListComponent } from '../category/category-list/category-list.component';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, CategoryListComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {}
