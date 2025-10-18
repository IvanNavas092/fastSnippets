import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OptionFramework } from '../../../components/option-framework/option-framework';
import { ModalPasteCode } from '../../../components/modal-paste-code/modal-paste-code';

@Component({
  selector: 'app-step-data',
  imports: [OptionFramework, ModalPasteCode, ReactiveFormsModule],
  templateUrl: './step-data.html',
  styles: ``
})
export class StepData {

  form!: FormGroup;
  isOpenModal = false;
  activeFramework: string = '';
  @Output() activeStep = new EventEmitter<number>();
  @Output() snippet = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    console.log('FormCreation component loaded');
    this.form = this.fb.group({
      title: ['', Validators.required, Validators.minLength(3)],
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
    console.log('code:', code);
    const codeGroup = this.fb.group({
      code: [code, Validators.required],
      action: ['', Validators.required]
    });
    return this.codes.push(codeGroup);
  }

  // submit form
  submit() {
    if (this.form.valid) {
      console.log('Enviado, todo correcto!')
      cont snippet = this.form.value;
      this.snippet.emit(snippet);
      this.form.reset();
      this.activeStep.emit(2);
    } else {
      this.form.markAllAsTouched();
    }

    
  }


  // function to check if codes are empty
  hasCodes() {
    return this.codes && this.codes.length > 0;
  }

  handleModal() {
    this.isOpenModal = !this.isOpenModal;
  }

  closeModal() {
    this.isOpenModal = false;
  }

  recoveryframework($event: string) {
    this.activeFramework = $event;
  }

}
