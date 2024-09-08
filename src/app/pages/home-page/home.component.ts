import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ApiResponse, PaginatedProductData } from '../../models/interfaces';
import { UIControlService } from '../../services/uicontrol.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  searchQuery: string = '';
  selectedCategory: string = '';

  products$: Observable<ApiResponse<PaginatedProductData>> | null = null;

  constructor(
    private productService: ProductService,
    private uiControlService: UIControlService,
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
    this.uiControlService.setCartVisibility(true);
  }

  onPaginationChange(pageEvent: PageEvent): void {
    this.products$ = this.productService.getAllProducts(
      pageEvent.pageSize,
      pageEvent.pageIndex,
    );
  }

  onSearchQuery(query: string): void {
    this.selectedCategory = '';
    this.searchQuery = query?.trim();

    if (this.searchQuery) {
      this.products$ = this.productService.getSearchedProduct(this.searchQuery);
    } else {
      this.products$ = this.productService.getAllProducts();
    }
  }

  onCategoryChange(category: string): void {
    if (category) {
      this.searchQuery = '';
      this.selectedCategory = category;

      this.products$ = this.productService.getSelectedCategoryProducts(
        this.selectedCategory,
      );
    } else {
      this.products$ = this.productService.getAllProducts();
    }
  }

  ngOnDestroy() {
    this.uiControlService.setCartVisibility(false);
  }
}
