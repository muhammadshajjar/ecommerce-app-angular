import { Component, Input } from '@angular/core';
import { CartItem, CartItemData } from '../../../models/interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [MatButtonModule, MatIcon, CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  constructor(private cartService: CartService) {}
  @Input() item: CartItem | null = null;

  onAddToCart(item: CartItemData) {
    this.cartService.addItemToCart(item);
  }
  onRemoveFromCart(id: number) {
    this.cartService.removeItemFromCart(id);
  }
}
