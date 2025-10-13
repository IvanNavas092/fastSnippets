import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-steps-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './steps-form.html',
})
export class StepsForm {
  @Input() stepActive: number = 1;
  form!: FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      codes: this.fb.array([], Validators.required),
      
    })
  }


   steps = [
    { number: 1, label: '1. Datos' },
    { number: 2, label: '2. Código' },
    { number: 3, label: '3. Revisión' }
  ];

  createCodeGroup(): FormGroup {
    return this.fb.group({
      code
    })

  }

}
