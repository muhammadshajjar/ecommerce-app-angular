import { Component } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatIcon,
    MatBadge,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {}
