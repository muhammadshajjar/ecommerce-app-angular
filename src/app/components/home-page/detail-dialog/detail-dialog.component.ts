import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartItemData, Product } from '../../../models/interfaces';
import { CartService } from '../../../services/cart.service';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrl: './detail-dialog.component.scss',
})
export class DetailDialogComponent {
  quantityControl = new FormControl(1, [
    Validators.required,
    Validators.min(1),
  ]);

  constructor(
    private dialogRef: MatDialogRef<DetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private cartService: CartService,
  ) {}

  onCancel() {
    this.closeDailog();
  }

  onAddToCart() {
    if (this.quantityControl.valid) {
      const quantity = this.quantityControl.value;

      const cartItem: CartItemData = this.mapProductToCartItem(this.data);
      this.cartService.addItemToCart(cartItem, quantity ? quantity : 1);

      this.closeDailog();
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

  private closeDailog() {
    this.dialogRef.close();
  }
}
