import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OptionFramework } from '../../../components/option-framework/option-framework';
import { ModalPasteCode } from '../../../components/modal-paste-code/modal-paste-code';
import { BoxCode } from "../../../components/box-code/box-code";

@Component({
  selector: 'app-step-data',
  imports: [OptionFramework, ModalPasteCode, ReactiveFormsModule, BoxCode],
  templateUrl: './step-data.html',
  styles: ``
})
export class StepData {
  @Input() form!: FormGroup;
  @Input() codes!: FormArray;
  @Output() addCodeChange = new EventEmitter<string>();
  @Output() nextStep = new EventEmitter<void>();

  isOpenModal = false;
  activeFramework: string = '';
  @Output() activeStep = new EventEmitter<number>();

  // remove code
  removeCode(index: number) {
    this.codes.removeAt(index);
  }


  // create code group
  addCode(code: string) {
    this.addCodeChange.emit(code);
  }

  // function to check if codes are empty
  hasCodes() {
    return this.codes.controls && this.codes.controls.length > 0;
  }

  // manage modal
  handleModal() {
    this.isOpenModal = !this.isOpenModal;
    document.body.classList.add('no-scroll');

  }

  // close modal
  closeModal() {
    this.isOpenModal = false;
    document.body.classList.remove('no-scroll');
  }

  // function for recovery framework of option-framwework
  recoveryframework($event: string) {
    this.activeFramework = $event;
  }

  // submit (next step)
  submit() {
    this.nextStep.emit();
  }

}
