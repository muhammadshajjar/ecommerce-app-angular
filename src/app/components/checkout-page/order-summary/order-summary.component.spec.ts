import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryComponent } from './order-summary.component';
import { CartService } from '../../../services/cart.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderSummaryComponent],
      providers: [CartService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
