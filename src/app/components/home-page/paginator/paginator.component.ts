import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() totalProducts?: number = 0;
  @Output() pagination = new EventEmitter();

  onPaginationChange(value: PageEvent) {
    this.pagination.emit(value);
  }
}
