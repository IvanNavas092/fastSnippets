import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BoxCode } from '../components/box-code/box-code';
import { OptionFramework } from '../components/option-framework/option-framework';

@Component({
  selector: 'app-form-creation',
  imports: [ReactiveFormsModule, BoxCode, OptionFramework],
  templateUrl: './form-creation.html',
})
export class FormCreation {
  @Input() form!: FormGroup;
  @Input() currentStep = 1;
  @Input() codes!: FormArray;

  @Output() nextStepChange = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<void>();
  @Output() frameworkSelected = new EventEmitter<string>();
  @Output() addCode = new EventEmitter<string>();
  @Output() removeCode = new EventEmitter<number>();
  @Output() allOkChange = new EventEmitter<boolean>();

  codeInput = new FormControl('', Validators.required);
  activeFramework = '';
  messageError = '';

  hasCodes(): boolean {
    return this.codes && this.codes.length > 0;
  }

  nextStep() {
    if (this.currentStep === 1) {
      const titleValid = this.form.get('title')?.valid;
      const frameworkValid = !!this.activeFramework;

      if (titleValid && frameworkValid) {
        this.allOkChange.emit(true);
        this.nextStepChange.emit();
        this.messageError = '';
      } else {
        this.allOkChange.emit(false);
        this.messageError = 'Introduce un título y selecciona un framework';
      }
    }

    if (this.currentStep === 2) {
      const codesValid = this.codes.length > 0;

      if (codesValid) {
        this.allOkChange.emit(true);
        this.nextStepChange.emit();
        this.messageError = '';
      } else {
        this.allOkChange.emit(false);
        this.messageError = 'Agrega al menos un código';
      }
    }
  }
  metete aqui https://chatgpt.com/c/68f53645-b89c-8330-81d9-e2bc51a8a957, acabo de hacer eso

  handleAddCode() {
    const code = this.codeInput.value?.trim();
    if (!code) return;

    this.addCode.emit(code); // 🔥 Emitimos al padre
    this.codeInput.reset(); // Limpia el textarea
  }

  recoveryFramework(fw: string) {
    this.activeFramework = fw;
  }
}
