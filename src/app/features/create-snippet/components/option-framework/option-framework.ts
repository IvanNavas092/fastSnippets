import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-option-framework',
  imports: [CommonModule],
  templateUrl: './option-framework.html',
})
export class OptionFramework {
  @Input() selectedFramework = '';
  @Output() frameworkSelected = new EventEmitter<string>();

  selectFramework(framework: string) {
    this.frameworkSelected.emit(framework);
  }

  frameworksOptions = [
    {
      name: 'Angular',
      route: 'angular.svg'
    },
    {
      name: 'React',
      route: 'react.svg'
    },
    {
      name: 'Vue',
      route: 'vue.svg'
    },
    {
      name: 'Svelte',
      route: 'svelte.svg'
    },
  ]
}
