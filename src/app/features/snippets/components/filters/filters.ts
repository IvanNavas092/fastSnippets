import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { filtersList } from '@/app/utils/Lists';
import { BubbleFramework } from '../bubble-framework/bubble-framework';
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [BubbleFramework],
  templateUrl: './filters.html',
  styles: ``,
})
export class Filters {
  filtersList = filtersList;
  @Input() selectedFramework: string = 'Todos';

  @Output() frameworkSelected = new EventEmitter<string>();

  onFrameworkSelected(frameworkName: string) {
    this.selectedFramework = frameworkName;

    // emit for parent component
    this.frameworkSelected.emit(frameworkName);
  }
}
