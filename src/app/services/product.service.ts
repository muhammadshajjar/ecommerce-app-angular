import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, of, retry, startWith, tap } from 'rxjs';
import { ApiBase, ProductEndpoints } from '../models/enums';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private handleApiCall(url: string, params?: HttpParams) {
    return this.http.get(url, { params }).pipe(
      map((data) => ({ state: 'loaded', data })),
      retry({ count: 2, delay: 2000 }),
      catchError((error) => of({ state: 'error', error: error.message })),
      tap((data) => console.log(data)),
      startWith({ state: 'loading' })
    );
  }

  getAllProducts(pageSize: number, pageIndex: number) {
    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('skip', (pageIndex * pageSize).toString());

    return this.handleApiCall(ApiBase.Products, params);
  }

  getSearchedProduct(query: string) {
    const params = new HttpParams().set('q', query);
    return this.handleApiCall(`${ProductEndpoints.Search}`, params);
  }

  getProductCategoriesList() {
    return this.handleApiCall(`${ProductEndpoints.CategoryList}`);
  }

  getSelectedCategoryProducts(category: string) {
    return this.handleApiCall(`${ProductEndpoints.Category}/${category}`);
  }
}
