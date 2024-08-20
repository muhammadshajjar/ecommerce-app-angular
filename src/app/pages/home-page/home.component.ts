import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ApiResponse, PaginatedProductData } from '../../models/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  searchQuery: string = '';
  selectedCategory: string = '';

  products$: Observable<ApiResponse<PaginatedProductData>> | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }

  onPaginationChange(pageEvent: PageEvent): void {
    this.products$ = this.productService.getAllProducts(
      pageEvent.pageSize,
      pageEvent.pageIndex,
    );
  }

  onSearchQuery(query: string): void {
    this.selectedCategory = '';
    this.searchQuery = query;

    this.products$ = this.productService.getSearchedProduct(this.searchQuery);
  }

  onCategoryChange(category: string): void {
    this.searchQuery = '';
    this.selectedCategory = category;

    this.products$ = this.productService.getSelectedCategoryProducts(
      this.selectedCategory,
    );
  }

  clearAll(): void {
    this.searchQuery = '';
    this.selectedCategory = '';

    this.products$ = this.productService.getAllProducts();
  }
}
