import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-modal-paste-code',
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-paste-code.html',
  styles: ``
})
export class ModalPasteCode {
  @Output() closeModal = new EventEmitter<void>();
  @Output() pasteCode = new EventEmitter<string>();
  codeInput: string = '';

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
    this.closeChange();
  }

}
