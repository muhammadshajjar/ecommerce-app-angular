import { Component } from '@angular/core';
import { ShippingForm } from '../../models/interfaces';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
})
export class CheckoutPageComponent {
  shippingFormData: ShippingForm | null = null;
  orderPlaced: boolean = false;

  onGetShippingFormData(data: ShippingForm) {
    this.shippingFormData = data;
  }

  onOrderPlaced() {
    this.orderPlaced = true;
  }
}
