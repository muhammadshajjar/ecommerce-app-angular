import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrl: './shipping-info.component.scss',
})
export class ShippingInfoComponent {
  shippingForm: FormGroup;

  @Output() shippingFormData = new EventEmitter();

  private subscription$: Subscription | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.shippingForm = this.formBuilder.group({
      deliveryMethod: ['delivery', Validators.required],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      termsAccepted: [false, Validators.requiredTrue],
    });
  }

  ngOnInit() {
    this.subscription$ = this.shippingForm.valueChanges.subscribe((values) => {
      if (this.shippingForm.valid) {
        this.shippingFormData.emit(values);
      } else {
        this.shippingFormData.emit(null);
      }
    });
  }
  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}
