import { CartItemData, Product } from './../../../models/interfaces';
import { Component, Input } from '@angular/core';

import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
  ) {}

  @Input() product: Product | undefined;

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
}
