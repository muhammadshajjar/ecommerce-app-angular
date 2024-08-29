import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPageComponent } from './edit-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/edit-page/confirmation-dialog/confirmation-dialog.component';

const editRoutes: Routes = [
  { path: ':productId', component: EditPageComponent },
];

@NgModule({
  declarations: [EditPageComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(editRoutes),
    ProductFormComponent,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class EditPageModule {}
