import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bubble-framework',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bubble-framework.html',
})
export class BubbleFramework {
  @Input() title: string = '';
  @Input() selected: boolean = false;
  @Output() onSelect = new EventEmitter<string>();

  selectFramework() {
    this.onSelect.emit(this.title);
  }
}
