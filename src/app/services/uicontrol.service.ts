import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIControlService {
  private _cartVisibleSource = new BehaviorSubject<boolean>(false);

  cartVisible$ = this._cartVisibleSource.asObservable();

  constructor() {}

  getCartVisiblity() {
    return this.cartVisible$;
  }

  setCartVisibility(visible: boolean) {
    this._cartVisibleSource.next(visible);
  }
}
