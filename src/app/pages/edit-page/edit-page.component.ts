import {
  ApiResponse,
  Product,
  ConfirmationDialogData,
} from './../../models/interfaces';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from './../../services/cart.service';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './../../components/confirmation-dialog/confirmation-dialog.component';

const dialogData: ConfirmationDialogData = {
  title: 'Confirm Deletion',
  desc: 'Are you sure you want to delete this product? This action cannot be undone.',
};

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
})
export class EditPageComponent {
  productForm: FormGroup = new FormGroup({});
  productData: Product | undefined;
  productId: string | undefined;

  constructor(
    private activatedRoutes: ActivatedRoute,
    private productService: ProductService,
    private snakBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private cartService: CartService,
  ) {}

  productData$ = new Observable<ApiResponse<Product>>();
  productDeleteResult$ = new Observable<ApiResponse<void>>();

  ngOnInit() {
    const productID = this.activatedRoutes.snapshot.params['productId'];

    this.productId = productID;

    this.productData$ = this.productService.getProductById(productID).pipe(
      tap((response) => {
        if (response.state === 'loaded') {
          this.productData = response.data;
        }
      }),
    );
  }

  onDeleteProduct() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
    });

    dialogRef.componentInstance.confirmClicked.subscribe((confirmation) => {
      if (confirmation) {
        this.deleteProduct();
        dialogRef.close();
      }
    });
  }

  private deleteProduct() {
    this.productDeleteResult$ = this.productService
      .deleteProduct(this.productId)
      .pipe(tap((response) => this.handleDeleteProductResponse(response)));
  }

  private handleDeleteProductResponse(response: ApiResponse<void>) {
    if (response.state === 'loaded') {
      this.openSnackBar('Product Deleted successfully', 'Done');
      this.router.navigateByUrl('/home');

      // remove product from cart if the product is deleted
      this.removeProductFromCart();
    }
    if (response.state === 'error') {
      this.openSnackBar('Something Went Wrong!', 'Done');
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snakBar.open(message, action, { duration: 3000 });
  }

  private removeProductFromCart() {
    this.productData &&
      this.cartService.removeItemFromCart(this.productData.id);
  }
}
