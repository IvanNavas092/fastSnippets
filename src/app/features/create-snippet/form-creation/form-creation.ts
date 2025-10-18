import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StepData } from "./components/step-data/step-data";

@Component({
  selector: 'app-form-creation',
  imports: [ReactiveFormsModule, StepData],
  templateUrl: './form-creation.html',
})

export class FormCreation {
  form: FormGroup;
  activeFramework: string = '';
  activeStep = 1;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      framework: [''],
      codes: this.fb.array([
      ])
    });
    this.activeStep = 1;
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
    this.activeStep = this.activeStep + 1;
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


}
