import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  constructor() {}

  searchControl: FormControl = new FormControl('');
  preventEmit: boolean = false;
  @Output() searchQuery = new EventEmitter();

  @Input()
  set searchedQuery(value: string) {
    if (value !== this.searchControl.value) {
      this.preventEmit = true;
      this.searchControl.setValue(value);
    }
  }

  private subscription$: Subscription | undefined;

  ngOnInit() {
    this.subscription$ = this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((query) => {
        if (!this.preventEmit) {
          this.searchQuery.emit(query);
        }
        this.preventEmit = false;
      });
  }

  clearSearch() {
    this.searchControl.reset();
  }
  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}
