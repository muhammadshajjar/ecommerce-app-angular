import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem, CartItemData } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartSource = new BehaviorSubject<Cart>({
    items: [],
    totalPrice: 0,
  });

  cart$ = this._cartSource.asObservable();

  getCartItems() {
    return this.cart$;
  }

  addItemToCart(product: CartItemData, quantity: number = 1) {
    const cart = this._cartSource.value;
    const existingCartItem = this.findCartItem(cart, product.id);

    if (existingCartItem) {
      this.updateItemQuantity(existingCartItem, quantity);
    } else {
      cart.items.push({ product, quantity });
    }

    cart.totalPrice = this.updateTotalPrice(cart.items);
    this._cartSource.next(cart);
  }

  removeItemFromCart(id: number) {
    const cart = this._cartSource.value;

    const existingCartItem = this.findCartItem(cart, id);

    if (existingCartItem) {
      this.updateItemQuantity(existingCartItem, -1);
      cart.items = cart.items.filter((item) => item.quantity > 0);
    }

    cart.totalPrice = this.updateTotalPrice(cart.items);
    this._cartSource.next(cart);
  }

  clearCart() {
    this._cartSource.next({
      items: [],
      totalPrice: 0,
    });
  }

  private findCartItem(cart: Cart, productId: number) {
    return cart.items.find((item) => item.product.id === productId);
  }

  private updateItemQuantity(cartItem: CartItem, quantityChange: number) {
    cartItem.quantity += quantityChange;
  }

  private updateTotalPrice(cartItems: CartItem[]) {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }
}
