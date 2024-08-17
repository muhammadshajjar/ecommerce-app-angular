import { Product } from './../../../models/interfaces';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  constructor(private dialog: MatDialog) {}

  @Input() product: Product | undefined;

  onPreviewDetail() {
    if (this.product) {
      this.dialog.open(DetailDialogComponent, {
        data: this.product,
      });
    }
  }

  onAddToCart() {
    console.log('Add to cart clicked');
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
