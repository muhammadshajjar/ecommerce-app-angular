import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Cart, CartItemData } from '../models/interfaces';
import { ProductService } from './product.service';

describe('CartService', () => {
  let service: CartService;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductService,
      ],
    });
    service = TestBed.inject(CartService);
    productService = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item to the cart', () => {
    const product: CartItemData = {
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'image.png',
    };
    service.addItemToCart(product, 2);

    service.getCartItems().subscribe((cart: Cart) => {
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].product.id).toBe(1);
      expect(cart.items[0].quantity).toBe(2);
    });
  });

  it('should remove an item from the cart', () => {
    const product: CartItemData = {
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'image.png',
    };
    service.addItemToCart(product, 1);
    service.removeItemFromCart(product.id);

    service.getCartItems().subscribe((cart: Cart) => {
      expect(cart.items.length).toBe(0);
    });
  });

  it('should calculate total price correctly', () => {
    const product1: CartItemData = {
      id: 1,
      title: 'Product 1',
      price: 100,
      image: 'image1.png',
    };
    const product2: CartItemData = {
      id: 2,
      title: 'Product 2',
      price: 50,
      image: 'image2.png',
    };

    service.addItemToCart(product1, 1);
    service.addItemToCart(product2, 2);

    service.getCartItems().subscribe((cart: Cart) => {
      expect(cart.totalPrice).toBe(200);
    });
  });

  it('should clear the cart', () => {
    service.clearCart();

    service.getCartItems().subscribe((cart: Cart) => {
      expect(cart.items.length).toBe(0);
      expect(cart.totalPrice).toBe(0);
    });
  });
});
