import { Product } from './../../models/interfaces';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
})
export class EditPageComponent {
  productForm: FormGroup = new FormGroup({});
  productData: Product | undefined;
  dataIsLoading: boolean = true;
  constructor(
    private activatedRoutes: ActivatedRoute,
    private productService: ProductService,
  ) {}

  async ngOnInit() {
    const productID = this.activatedRoutes.snapshot.params['productId'];

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
}
