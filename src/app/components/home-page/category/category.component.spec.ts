import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { ProductService } from '../../../services/product.service';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatChipListbox } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [MatChipListbox, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
