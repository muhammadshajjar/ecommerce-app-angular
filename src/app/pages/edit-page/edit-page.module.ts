import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPageComponent } from './edit-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProductFormComponent } from '../../components/edit-page/product-form/product-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

const editRoutes: Routes = [
  { path: ':productId', component: EditPageComponent },
];

@NgModule({
  declarations: [EditPageComponent, ProductFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(editRoutes),
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinner,
  ],
})
export class EditPageModule {}
