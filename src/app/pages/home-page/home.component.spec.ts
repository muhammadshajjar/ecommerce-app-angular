import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SearchComponent } from '../../components/home-page/search/search.component';
import { CategoryComponent } from '../../components/home-page/category/category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  MatButtonModule,
  MatFabButton,
  MatIconButton,
} from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { PaginatorComponent } from '../../components/home-page/paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailDialogComponent } from '../../components/home-page/detail-dialog/detail-dialog.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        SearchComponent,
        CategoryComponent,
        PaginatorComponent,
        DetailDialogComponent,
      ],
      imports: [
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
        NgOptimizedImage,
        MatChipsModule,
        BrowserAnimationsModule,
      ],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
