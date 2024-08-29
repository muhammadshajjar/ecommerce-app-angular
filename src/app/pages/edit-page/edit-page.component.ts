import { ApiResponse, Product } from './../../models/interfaces';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormGroup } from '@angular/forms';
import { lastValueFrom, Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/edit-page/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
})
export class EditPageComponent {
  productForm: FormGroup = new FormGroup({});
  productData: Product | undefined;
  dataIsLoading: boolean = true;
  productId: string | undefined;

  constructor(
    private activatedRoutes: ActivatedRoute,
    private productService: ProductService,
    private snakBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  productDeleteResult$ = new Observable<ApiResponse<void>>();

  async ngOnInit() {
    const productID = this.activatedRoutes.snapshot.params['productId'];

    this.productId = productID;
    // convert observable to promise
    try {
      const productResponse = await lastValueFrom(
        this.productService.getProductById(productID),
      );
      this.dataIsLoading = false;
      this.productData = productResponse?.data;
    } catch (err) {
      console.log(err);
    }
  }

  onDeleteProduct() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.componentInstance.confirmClicked.subscribe((confirmation) => {
      if (confirmation) {
        this.productDeleteResult$ = this.productService
          .deleteProduct(this.productId)
          .pipe(
            tap((response) => {
              if (response.state === 'loaded') {
                this.openSnackBar('Product Deleted successfully', 'Done');

                this.router.navigateByUrl('/home');
              }
              if (response.state === 'error') {
                this.openSnackBar('Something Went Wrong!', 'Done');
              }
            }),
          );
        dialogRef.close();
      }
    });
  }
  private openSnackBar(message: string, action: string) {
    this.snakBar.open(message, action, { duration: 3000 });
  }
}
