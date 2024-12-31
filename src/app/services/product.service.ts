import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

interface IGetCartResponse {
  _id: string,
  products: string[]
}

interface IGetCategoriesResponse {
  categories: string[]
}

interface IGetProductsByCategoryResponse {
  products: Product[]
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<IGetCategoriesResponse> {
    return this.http.get<IGetCategoriesResponse>(`${this.apiUrl}/products/categories`);
  }

  getProductsByCategory(categoryName: string): Observable<IGetProductsByCategoryResponse> {
    return this.http.get<IGetProductsByCategoryResponse>(
      `${this.apiUrl}/products/category?category=${categoryName}`
    );
  }

  saveCart(cart: any[], userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/shopping-cart?user_id=${userId}`, cart);
  }

  getCart(userId: string): Observable<IGetCartResponse[]> {
    return this.http.get<IGetCartResponse[]>(
      `${this.apiUrl}/shopping-cart?user_id=${userId}`
    );
  }
}
