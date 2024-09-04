import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingInfoComponent } from './shipping-info.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ShippingInfoComponent', () => {
  let component: ShippingInfoComponent;
  let fixture: ComponentFixture<ShippingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingInfoComponent],
      imports: [
        BrowserAnimationsModule,
        MatRadioModule,
        MatIconModule,
        MatFormFieldModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatInputModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit valid form data when the form is filled correctly', () => {
    spyOn(component.shippingFormData, 'emit');

    component.shippingForm.setValue({
      deliveryMethod: 'delivery',
      fullName: 'muhammad shajjar',
      email: 'muhammadshajjar99@gmail.com',
      phone: '03212423296',
      city: 'gk',
      termsAccepted: true,
    });

    expect(component.shippingFormData.emit).toHaveBeenCalledWith({
      deliveryMethod: 'delivery',
      fullName: 'muhammad shajjar',
      email: 'muhammadshajjar99@gmail.com',
      phone: '03212423296',
      city: 'gk',
      termsAccepted: true,
    });
  });
  it('should emit null when the form is invalid', () => {
    spyOn(component.shippingFormData, 'emit');

    component.shippingForm.setValue({
      deliveryMethod: '',
      fullName: '',
      email: '',
      phone: '',
      city: '',
      termsAccepted: false,
    });

    fixture.detectChanges();

    expect(component.shippingFormData.emit).toHaveBeenCalledWith(null);
  });
});
