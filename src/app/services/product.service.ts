import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, startWith, tap } from 'rxjs';
import { ApiBase, ProductEndpoints } from '../models/enums';
import {
  ApiResponse,
  CategoryList,
  PaginatedProductData,
  Product,
} from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private handleApiCall<T>(
    url: string,
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    params?: HttpParams,
    body?: any,
  ): Observable<ApiResponse<T>> {
    const options = {
      params,
      body,
      headers: { 'Content-Type': 'application/json' },
    };

    return this.http.request<T>(method, url, options).pipe(
      map((data: any) => this.transformApiResponse(data, options.params)),
      retry({ count: 2, delay: 2000 }),
      catchError((error) => of({ state: 'error', error: error.message })),
      startWith({ state: 'loading' }),
      tap((response) => console.log(response)),
    );
  }

  getAllProducts(
    pageSize: number = 30,
    pageIndex: number = 1,
  ): Observable<ApiResponse<PaginatedProductData>> {
    const params = new HttpParams()
      .set('_page', pageIndex.toString())
      .set('_limit', pageSize.toString());

    return this.handleApiCall<PaginatedProductData>(
      ApiBase.ProductsOnJsonServer,
      'GET',
      params,
    );
  }

  getSearchedProduct(
    query: string,
  ): Observable<ApiResponse<PaginatedProductData>> {
    const params = new HttpParams().set('title_like', query);

    console.log(query);
    return this.handleApiCall<PaginatedProductData>(
      `${ApiBase.ProductsOnJsonServer}`,
      'GET',
      params,
    );
  }

  getProductCategoriesList(): Observable<ApiResponse<CategoryList>> {
    return this.handleApiCall<CategoryList>(
      `${ApiBase.CategoriesOnJsonServer}`,
      'GET',
    );
  }

  getSelectedCategoryProducts(
    category: string,
  ): Observable<ApiResponse<PaginatedProductData>> {
    const params = new HttpParams().set('category', category);
    return this.handleApiCall<PaginatedProductData>(
      `${ApiBase.ProductsOnJsonServer}`,
      'GET',
      params,
    );
  }

  getProductById(id: number): Observable<ApiResponse<Product>> {
    return this.handleApiCall<Product>(
      `${ApiBase.ProductsOnJsonServer}/${id}`,
      'GET',
    );
  }

  updateProductData(
    updatedData: Product,
    id: any,
  ): Observable<ApiResponse<Product>> {
    const body = updatedData;
    return this.handleApiCall<Product>(
      `${ApiBase.ProductsOnJsonServer}/${id}`,
      'PATCH',
      undefined,
      body,
    );
  }

  deleteProduct(id: any): Observable<ApiResponse<void>> {
    return this.handleApiCall<void>(
      `${ApiBase.ProductsOnJsonServer}/${id}`,
      'DELETE',
    );
  }

  transformApiResponse(data: any, params?: HttpParams) {
    if (
      params?.has('_page') ||
      params?.has('category') ||
      params?.has('title_like')
    ) {
      return {
        state: 'loaded',
        data: {
          products: data,
          limit: 0,
          skip: 0,
          total: data.length,
        },
      };
    } else {
      return { state: 'loaded', data };
    }
  }
}
