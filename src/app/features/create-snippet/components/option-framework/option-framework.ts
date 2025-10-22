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
      route: 'svgs-icons-fw/angular.svg'
    },
    {
      name: 'React',
      route: 'svgs-icons-fw/react.svg'
    },
    {
      name: 'Vue',
      route: 'svgs-icons-fw/vue.svg'
    },
    {
      name: 'Svelte',
      route: 'svgs-icons-fw/svelte.svg'
    },
  ]
}
