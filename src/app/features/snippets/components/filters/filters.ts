import { Component, OnInit } from '@angular/core';
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
  selectedFramework: string = '';

  onFrameworkSelected(frameworkName: string) {
    this.selectedFramework = frameworkName;
    console.log('Framework seleccionado:', frameworkName);
  }
}
