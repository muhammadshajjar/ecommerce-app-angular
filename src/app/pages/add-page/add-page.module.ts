import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPageComponent } from './add-page.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { RouterModule, Routes } from '@angular/router';

const addRoutes: Routes = [{ path: '', component: AddPageComponent }];

@NgModule({
  declarations: [AddPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(addRoutes),
    ProductFormComponent,
  ],
})
export class AddPageModule {}
