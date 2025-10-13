import { Component, Output, EventEmitter, Input } from '@angular/core';
import { filtersList } from '@/app/utils/Lists';
import { BubbleFramework } from '../bubble-framework/bubble-framework';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [BubbleFramework, FormsModule],
  templateUrl: './filters.html',
  styles: ``,
})
export class Filters {
  filtersList = filtersList;
  @Input() selectedFramework: string = 'Todos';
  searchValue: string = '';
  @Output() search = new EventEmitter<string>();

  @Output() frameworkSelected = new EventEmitter<string>();

  onFrameworkSelected(frameworkName: string) {
    this.selectedFramework = frameworkName;

    // emit for parent component
    this.frameworkSelected.emit(frameworkName);
  }
  onSearch(search: string) {
    this.search.emit(search);
  }
}
