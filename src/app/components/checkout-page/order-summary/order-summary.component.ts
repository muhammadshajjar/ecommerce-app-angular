import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Observable } from 'rxjs';
import { Cart } from '../../../models/interfaces';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
  constructor(private cartService: CartService) {}

  isCartOpen: boolean = false;
  shippingCost: number = 5; // for now it is fixed
  private _shippingFromData: null = null;

  @Output() placeOrder = new EventEmitter();
  @Input()
  set shippingFormData(value: any) {
    this._shippingFromData = value;
  }

  get shippingFormData() {
    return this._shippingFromData;
  }

  cart$: Observable<Cart> | null = null;

  ngOnInit() {
    this.cart$ = this.cartService.getCartItems();
  }

  onPayment() {
    this.cartService.clearCart();
    this.placeOrder.emit(true);
  }
}
