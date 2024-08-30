import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncPipe } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ApiResponse, Product } from '../../models/interfaces';
import { Observable, tap } from 'rxjs';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    AsyncPipe,
    MatError,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatOption,
    MatSelect,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  productForm: FormGroup;
  uploadedImage: string = '';
  isEditMode: boolean = false;
  private _productData: Product | undefined;

  productUpdateResult$: Observable<ApiResponse<Product>> | null = null;

  categories$: Observable<any> | null = null;

  @Input()
  set productData(data: Product | undefined) {
    if (data) {
      this._productData = data;
      this.isEditMode = true;
      this.updateForm();
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private snakBar: MatSnackBar,
    private router: Router,
  ) {
    this.productForm = this.initializeForm();
  }

  ngOnInit() {
    this.categories$ = this.productService.getProductCategoriesList();
  }

  onFormSubmit() {
    if (this.productForm.valid) {
      this.isEditMode ? this.editProduct() : this.addProduct();
    } else {
      this.openSnackBar('Please fill all fields', 'Done');
    }
  }

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.uploadedImage = base64Image;
        this.productForm.patchValue({ thumbnail: base64Image });
      };
      reader.readAsDataURL(file);
    }
  }

  private updateForm() {
    if (this._productData) {
      this.productForm.patchValue({
        title: this._productData.title,
        price: this._productData.price,
        sku: this._productData.sku,
        stock: this._productData.stock,
        shippingInformation: this._productData.shippingInformation,
        description: this._productData.description,
        warrantyInformation: this._productData.warrantyInformation,
        category: this._productData.category,
        discountPercentage: this._productData.discountPercentage,
        thumbnail: this._productData.thumbnail,
      });
      this.uploadedImage = this._productData.thumbnail;
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snakBar.open(message, action, { duration: 3000 });
  }

  private addProduct() {
    this.productUpdateResult$ = this.productService
      .addProduct(this.productForm.value)
      .pipe(
        tap((response) => {
          if (response.state === 'loaded') {
            this.openSnackBar('Product Addded successfully', 'Done');
            this.router.navigateByUrl('/home');
          }
        }),
      );
  }
  private editProduct() {
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
  private initializeForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      sku: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      shippingInformation: ['', Validators.required],
      description: ['', Validators.required],
      warrantyInformation: ['', Validators.required],
      discountPercentage: ['', [Validators.required, Validators.max(100)]],
      category: ['', Validators.required],
      thumbnail: ['', Validators.required],
    });
  }
}
