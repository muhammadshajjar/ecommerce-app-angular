import {
  ApiResponse,
  CartItemData,
  Product,
} from './../../../models/interfaces';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private productService: ProductService,
    private snakBar: MatSnackBar,
  ) {}

  @Input() product: Product | undefined;
  @Output() productDeleted = new EventEmitter();

  productDeleteResult$ = new Observable<ApiResponse<void>>();

  onPreviewDetail() {
    if (this.product) {
      this.dialog.open(DetailDialogComponent, {
        data: this.product,
      });
    }
  }

  onAddToCart() {
    if (this.product) {
      const cartItem: CartItemData = this.mapProductToCartItem(this.product);
      this.cartService.addItemToCart(cartItem);
    }
  }

  onDeleteProduct() {
    if (this.product) {
      this.productDeleteResult$ = this.productService
        .deleteProduct(this.product.id)
        .pipe(
          tap((response) => {
            if (response.state === 'loaded') {
              this.openSnackBar('Product Deleted successfully', 'Done');
              this.productDeleted.emit();
            }
            if (response.state === 'error') {
              this.openSnackBar('Something Went Wrong!', 'Done');
            }
          }),
        );
    }
  }

  private mapProductToCartItem(product: Product): CartItemData {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
    };
  }

  calculateDiscountedPrice() {
    if (!this.product) {
      return 0;
    }
    return (
      this.product.price -
      Math.trunc((this.product.price * this.product.discountPercentage) / 100)
    );
  }
  private openSnackBar(message: string, action: string) {
    this.snakBar.open(message, action, { duration: 3000 });
  }
}
