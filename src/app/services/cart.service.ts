import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map } from 'rxjs';
import { Cart, CartItem, CartItemData, StoreCart } from '../models/interfaces';
import { StorageKeys } from '../models/enums';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartSource = new BehaviorSubject<Cart>({
    items: [],
    totalPrice: 0,
  });

  constructor(private productService: ProductService) {
    this.updateCartItemsWithProductDetails();
  }

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

    cart.totalPrice = this.calculateTotalPrice(cart.items);

    this.updateCartState(cart);
  }

  removeItemFromCart(id: number) {
    const cart = this._cartSource.value;

    const existingCartItem = this.findCartItem(cart, id);

    if (existingCartItem) {
      this.updateItemQuantity(existingCartItem, -1);
      cart.items = cart.items.filter((item) => item.quantity > 0);
    }

    cart.totalPrice = this.calculateTotalPrice(cart.items);

    this.updateCartState(cart);
  }

  clearCart() {
    let initialState = {
      items: [],
      totalPrice: 0,
    };

    this.updateCartState(initialState);
  }

  updateCartItemsWithProductDetails() {
    const cartItems: StoreCart[] = this.getCartItemsFromLocalStorage();

    this.fetchProductDetails(cartItems).subscribe((updatedItems) => {
      const updatedCart: Cart = {
        items: updatedItems,
        totalPrice: this.calculateTotalPrice(updatedItems),
      };
      this._cartSource.next(updatedCart);
    });
  }

  private fetchProductDetails(cartItems: StoreCart[]) {
    const productRequests = cartItems.map((item) =>
      this.productService.getProductById(item.id),
    );

    return forkJoin(productRequests).pipe(
      map((responses) =>
        this.mapProductDetailsToCartItems(responses, cartItems),
      ),
    );
  }

  private mapProductDetailsToCartItems(
    productResponses: any[],
    cartItems: StoreCart[],
  ) {
    const loadedProducts = productResponses
      .filter((response) => response.state === 'loaded' && response.data)
      .map((response) => response.data);

    return cartItems.map((item) => {
      const product = loadedProducts.find((product) => product.id === item.id);
      return {
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.thumbnail,
        },
        quantity: item.quantity,
      };
    });
  }

  private getCartItemsFromLocalStorage() {
    const cartData = localStorage.getItem(StorageKeys.CartItems);
    if (!cartData) return [];
    const { items } = JSON.parse(cartData);
    return items;
  }

  private saveCartToLocalStorage(cart: Cart) {
    const cartData = {
      items: cart.items.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      })),
    };
    localStorage.setItem(StorageKeys.CartItems, JSON.stringify(cartData));
  }

  private updateCartState(cart: Cart) {
    this._cartSource.next(cart);
    this.saveCartToLocalStorage(cart);
  }

  private findCartItem(cart: Cart, productId: number) {
    return cart.items.find((item) => item.product.id === productId);
  }

  private updateItemQuantity(cartItem: CartItem, quantityChange: number) {
    cartItem.quantity += quantityChange;
  }

  private calculateTotalPrice(cartItems: CartItem[]) {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }
}
