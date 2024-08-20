import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../models/interfaces';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  productForm: FormGroup;
  private _productData: Product | undefined;

  constructor(private formBuilder: FormBuilder) {
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
      console.log(this.productForm.value);
    }
  }

  private updateForm(): void {
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
}
