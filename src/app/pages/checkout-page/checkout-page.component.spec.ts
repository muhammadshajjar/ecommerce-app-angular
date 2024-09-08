import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPageComponent } from './checkout-page.component';
import { ShippingInfoComponent } from '../../components/checkout-page/shipping-info/shipping-info.component';
import {
  MatError,
  MatFormField,
  MatInputModule,
  MatLabel,
} from '@angular/material/input';
import {
  MatRadioButton,
  MatRadioGroup,
  MatRadioModule,
} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CartItemComponent } from '../../components/cart/cart-item/cart-item.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { OrderSummaryComponent } from '../../components/checkout-page/order-summary/order-summary.component';
import { CartService } from '../../services/cart.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CheckoutPageComponent', () => {
  let component: CheckoutPageComponent;
  let fixture: ComponentFixture<CheckoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CheckoutPageComponent,
        ShippingInfoComponent,
        OrderSummaryComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatLabel,
        MatError,
        MatFormField,
        ReactiveFormsModule,
        MatRadioButton,
        MatButtonModule,
        MatRadioGroup,
        MatIcon,
        CartItemComponent,
        MatCheckbox,
        MatRadioModule,
      ],
      providers: [CartService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
