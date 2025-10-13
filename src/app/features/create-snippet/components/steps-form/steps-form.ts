import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-steps-form',
  imports: [CommonModule],
  templateUrl: './steps-form.html',
  styles: ``
})
export class StepsForm {
  @Input() stepActive: number = 1;

   steps = [
    { number: 1, label: '1. Datos' },
    { number: 2, label: '2. Código' },
    { number: 3, label: '3. Revisión' }
  ];

}
