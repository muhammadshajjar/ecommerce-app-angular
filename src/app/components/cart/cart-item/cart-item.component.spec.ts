import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from './cart-item.component';
import { CartService } from '../../../services/cart.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemComponent],
      providers: [CartService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
