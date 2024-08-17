import { Component, Inject } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../../models/interfaces';
@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrl: './detail-dialog.component.scss',
})
export class DetailDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onAddToCart() {
  }
}
