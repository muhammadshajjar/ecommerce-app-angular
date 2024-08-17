import { Component, Input } from '@angular/core';
import { Product } from '../../../models/interfaces';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product: Product | undefined;

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
