import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormsModule } from '@angular/forms';
import { BoxCode } from "../box-code/box-code";
@Component({
  selector: 'app-modal-paste-code',
  imports: [FormsModule, CommonModule, BoxCode],
  templateUrl: './modal-paste-code.html',
  styles: ``
})
export class ModalPasteCode {
  @Output() closeModal = new EventEmitter<void>();
  @Output() pasteCode = new EventEmitter<string>();
  @Input() codes!: FormArray;
  codeInput: string = '';

  constructor() {
    console.log('ModalPasteCode component loaded');
  }

  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDown(event: Event) {
    if (event instanceof KeyboardEvent) {
      event.preventDefault();
      this.pasteCodeChange();
    }
  }

  closeChange() {
    this.closeModal.emit();
  }

  pasteCodeChange() {
    this.pasteCode.emit(this.codeInput);
    this.codeInput = '';
  }

  removeCode(index: number) {
    this.codes.removeAt(index);
  }
}
