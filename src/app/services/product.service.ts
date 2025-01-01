import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetCartResponse } from '../interfaces/GetCartResponse';
import { IGetCategoriesResponse } from '../interfaces/getCategoryResponse';
import { IGetProductsByCategoryResponse } from '../interfaces/getProductsByCategoryResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000';

  

  constructor(private http: HttpClient) {}

  getCategories(): Observable<IGetCategoriesResponse> {
    return this.http.get<IGetCategoriesResponse>(
      `${this.apiUrl}/products/categories`
    );
  }

  getProductsByCategory(
    categoryName: string
  ): Observable<IGetProductsByCategoryResponse> {
    return this.http.get<IGetProductsByCategoryResponse>(
      `${this.apiUrl}/products/category?category=${categoryName}`
    );
  }

  saveCart(cart: any[], userId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/shopping-cart?user_id=${userId}`,
      cart
    );
  }

  getCart(userId: string): Observable<IGetCartResponse[]> {
    return this.http.get<IGetCartResponse[]>(
      `${this.apiUrl}/shopping-cart?user_id=${userId}`
    );
  }
}
