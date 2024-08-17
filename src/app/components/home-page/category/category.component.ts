import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  constructor(private productService: ProductService) {}

  @Input()
  set selectedCategory(value: string) {
    this.categoryControl.setValue(value); //on clear filters, set category option to default
  }
  @Output() selectCategory = new EventEmitter();

  categoryControl: FormControl = new FormControl('');

  categories$: Observable<any> | null = null;

  ngOnInit() {
    this.categories$ = this.productService.getProductCategoriesList();
  }

  onSelectCategory(category: string) {
    this.selectCategory.emit(category);
  }
}
