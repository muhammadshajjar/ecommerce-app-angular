import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchControl: FormControl = new FormControl('');
  @Output() searchQuery = new EventEmitter();

  onSearch() {
    if (this.searchControl.value) {
      this.searchQuery.emit(this.searchControl.value);
      this.searchControl.reset();
    }
  }
}
