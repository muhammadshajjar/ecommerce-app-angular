import { Component } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { CartItemComponent } from './cart-item/cart-item.component';
import { Cart } from '../../models/interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartItemComponent,
    MatIcon,
    MatBadge,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    AsyncPipe,
    RouterLink,
  ],

  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private cartService: CartService) {}
  isCartOpen: boolean = false;

  cart$: Observable<Cart> | null = null;

  ngOnInit() {
    this.cart$ = this.cartService.getCartItems();
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
}
