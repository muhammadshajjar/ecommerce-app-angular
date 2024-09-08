import { Component } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { CartItemComponent } from './cart-item/cart-item.component';
import { Cart, ConfirmationDialogData } from '../../models/interfaces';
import { RouterLink } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

const dialogData: ConfirmationDialogData = {
  title: 'Clear Cart Confirmation',
  desc: 'Are you sure you want to clear your cart? This action will remove all items, and it cannot be undone.',
};
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
    ConfirmationDialogComponent,
  ],

  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
  ) {}
  isCartOpen: boolean = false;

  cart$: Observable<Cart> | null = null;

  ngOnInit() {
    this.cart$ = this.cartService.getCartItems();
  }

  onClearCart() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
    });

    dialogRef.componentInstance.confirmClicked.subscribe((confirmation) => {
      if (confirmation) {
        this.cartService.clearCart();
        dialogRef.close();
      }
    });
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
}
