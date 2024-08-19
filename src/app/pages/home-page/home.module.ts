import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { HomeComponent } from './home.component';
import { SearchComponent } from '../../components/home-page/search/search.component';
import { CategoryComponent } from '../../components/home-page/category/category.component';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  MatButtonModule,
  MatFabButton,
  MatIconButton,
} from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from '../../components/home-page/paginator/paginator.component';
import { ProductItemComponent } from '../../components/home-page/product-item/product-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailDialogComponent } from '../../components/home-page/detail-dialog/detail-dialog.component';

const homeRoutes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    CategoryComponent,
    PaginatorComponent,
    ProductItemComponent,
    DetailDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    ReactiveFormsModule,
    CurrencyPipe,
    MatIcon,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatIconButton,
    MatSuffix,
    MatInput,
    MatSelect,
    MatPaginatorModule,
    MatCardModule,
    MatFabButton,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class HomeModule {}
