import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BoxCode } from "../components/box-code/box-code";
import { OptionFramework } from '../components/option-framework/option-framework';

@Component({
  selector: 'app-form-creation',
  imports: [ReactiveFormsModule, BoxCode, OptionFramework],
  templateUrl: './form-creation.html',
})

export class FormCreation {
  form: FormGroup;
  activeFramework: string = '';
  @Output() currentStepChange = new EventEmitter<number>();
  currentStep: number = 1;
  codeInput: string = '';

  isOpenModal = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      framework: [''],
      codes: this.fb.array([
      ])
    });
  }

  // get codes
  get codes(): FormArray {
    return this.form.get('codes') as FormArray;
  }

  removeCode(index: number) {
    this.codes.removeAt(index);
  }

  // create code group
  addCode(code: string) {
    const codeGroup = this.fb.group({
      code: [code, Validators.required],
      action: ['', Validators.required]
    });
    return this.codes.push(codeGroup);
  }

  nextStep() {
    this.currentStep = this.currentStep + 1;
    this.currentStepChange.emit(this.currentStep);
    console.log('currentStep', this.currentStep);
  }

  // submit form
  submit() {
    if (this.form.valid) {
      console.log('Enviado, todo correcto!')
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  // function to check if codes are empty
  hasCodes() {
    return this.codes && this.codes.length > 0;
  }

  recoveryframework($event: string) {
    this.activeFramework = $event;
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


}
