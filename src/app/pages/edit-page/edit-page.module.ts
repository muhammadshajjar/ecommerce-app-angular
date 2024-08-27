import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPageComponent } from './edit-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

const editRoutes: Routes = [
  { path: ':productId', component: EditPageComponent },
];

@NgModule({
  declarations: [EditPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(editRoutes),
    ProductFormComponent,
  ],
})
export class EditPageModule {}
