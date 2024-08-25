import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchControl: FormControl = new FormControl('');
  @Output() searchQuery = new EventEmitter();

  private subscription$: Subscription | undefined;

  ngOnInit() {
    this.subscription$ = this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((query) => {
        this.searchQuery.emit(query);
      });
  }

  clearSearch() {
    this.searchControl.reset();
  }
  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}
