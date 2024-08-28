import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutPageComponent } from './checkout-page.component';
import { RouterModule, Routes } from '@angular/router';
import {
  MatError,
  MatFormField,
  MatInputModule,
  MatLabel,
} from '@angular/material/input';
import { ShippingInfoComponent } from '../../components/checkout-page/shipping-info/shipping-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { OrderSummaryComponent } from '../../components/checkout-page/order-summary/order-summary.component';
import { CartItemComponent } from '../../components/cart/cart-item/cart-item.component';
import { MatCheckbox } from '@angular/material/checkbox';

const checkoutRoutes: Routes = [{ path: '', component: CheckoutPageComponent }];

@NgModule({
  declarations: [
    CheckoutPageComponent,
    ShippingInfoComponent,
    OrderSummaryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(checkoutRoutes),
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
  ],
})
export class CheckoutPageModule {}
