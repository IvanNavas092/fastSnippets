import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-box-code',
  imports: [],
  templateUrl: './box-code.html',
  styles: ``
})
export class BoxCode {
  @Input() code!: string;
  @Output() removeCode = new EventEmitter<number>();

  removeCodeChange() {
    this.removeCode.emit();
  }
}
