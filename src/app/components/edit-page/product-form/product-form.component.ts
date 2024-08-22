import { ApiResponse } from './../../../models/interfaces';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../models/interfaces';
import { ProductService } from '../../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  productForm: FormGroup;
  private _productData: Product | undefined;

  productUpdateResult$ = new Observable<ApiResponse<Product>>();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private snakBar: MatSnackBar,
  ) {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      discountPercentage: ['', Validators.required],
      stock: ['', Validators.required],
      rating: ['', Validators.required],
      description: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  @Input()
  set productData(data: Product | undefined) {
    this._productData = data;
    this.updateForm();
  }

  onEditFormSubmit() {
    if (this.productForm.valid) {
      const productId = this._productData?.id;

      this.productUpdateResult$ = this.productService
        .updateProductData(this.productForm.value, productId)
        .pipe(
          tap((response) => {
            if (response.state === 'loaded') {
              this.openSnackBar('Product updated successfully', 'Done');
            }
          }),
        );
    }
  }

  private updateForm() {
    if (this._productData) {
      this.productForm.patchValue({
        title: this._productData.title,
        price: this._productData.price,
        discountPercentage: this._productData.discountPercentage,
        stock: this._productData.stock,
        rating: this._productData.rating,
        description: this._productData.description,
        brand: this._productData.brand,
        category: this._productData.category,
      });
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snakBar.open(message, action, { duration: 3000 });
  }
}
