import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  constructor(private productService: ProductService) {}
  preventEmit: boolean = false;
  isInitialized: boolean = false;
  categoryControl: FormControl = new FormControl('');

  @Input()
  set selectedCategory(value: string) {
    if (this.isInitialized) {
      this.preventEmit = true;
    }
    this.categoryControl.setValue(value); //on clear filters, set category option to default
  }
  @Output() selectCategory = new EventEmitter();

  categories$: Observable<any> | null = null;

  private subscription$: Subscription | undefined;

  ngOnInit() {
    this.categories$ = this.productService.getProductCategoriesList();

    this.subscription$ = this.categoryControl.valueChanges.subscribe(
      (selectedCategory) => {
        if (!this.preventEmit) {
          this.selectCategory.emit(selectedCategory);
        }
        this.preventEmit = false;
      },
    );

    this.isInitialized = true;
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}
