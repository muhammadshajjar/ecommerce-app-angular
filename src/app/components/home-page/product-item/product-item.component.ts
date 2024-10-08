import { CartItemData, Product } from './../../../models/interfaces';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private snakBar: MatSnackBar,
  ) {}

  @Input() product: Product | undefined;
  @Output() productDeleted = new EventEmitter();

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
