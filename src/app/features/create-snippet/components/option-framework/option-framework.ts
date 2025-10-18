import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-option-framework',
  imports: [CommonModule],
  templateUrl: './option-framework.html',
})
export class OptionFramework {
  @Output() frameworkSelected = new EventEmitter<string>();
  activeFramework: string = '';

  selectFramework(framework: string) {
    this.activeFramework = framework;
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
