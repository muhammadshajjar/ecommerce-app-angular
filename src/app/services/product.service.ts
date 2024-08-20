import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, startWith, tap } from 'rxjs';
import { ApiBase, ProductEndpoints } from '../models/enums';
import {
  ApiResponse,
  CategoryList,
  PaginatedProductData,
} from '../models/interfaces';
import { Product } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private handleApiCall<T>(
    url: string,
    params?: HttpParams,
  ): Observable<ApiResponse<T>> {
    return this.http.get<T>(url, { params }).pipe(
      map((data) => ({ state: 'loaded', data })),
      retry({ count: 2, delay: 2000 }),
      catchError((error) => of({ state: 'error', error: error.message })),
      startWith({ state: 'loading' }),
      tap((response) => console.log(response)),
    );
  }

  getAllProducts(
    pageSize: number = 30,
    pageIndex: number = 0,
  ): Observable<ApiResponse<PaginatedProductData>> {
    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('skip', (pageIndex * pageSize).toString());

    return this.handleApiCall<PaginatedProductData>(ApiBase.Products, params);
  }

  getSearchedProduct(
    query: string,
  ): Observable<ApiResponse<PaginatedProductData>> {
    const params = new HttpParams().set('q', query);
    return this.handleApiCall<PaginatedProductData>(
      `${ProductEndpoints.Search}`,
      params,
    );
  }

  getProductCategoriesList(): Observable<ApiResponse<CategoryList>> {
    return this.handleApiCall<CategoryList>(`${ProductEndpoints.CategoryList}`);
  }

  getSelectedCategoryProducts(
    category: string,
  ): Observable<ApiResponse<PaginatedProductData>> {
    return this.handleApiCall<PaginatedProductData>(
      `${ProductEndpoints.Category}/${category}`,
    );
  }

  getProductById(id: number): Observable<ApiResponse<Product>> {
    return this.handleApiCall<Product>(`${ApiBase.Products}/${id}`);
  }
}
