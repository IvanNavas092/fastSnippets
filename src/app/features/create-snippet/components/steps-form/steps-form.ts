import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-steps-form',
  imports: [CommonModule],
  templateUrl: './steps-form.html',
})
export class StepsForm {
  @Input() stepActive: number = 1;
  @Output() stepChanged = new EventEmitter<number>();
  @Input() allOk = false;

  steps = [
    { number: 1, label: '1. Datos' },
    { number: 2, label: '2. Código' },
    { number: 3, label: '3. Revisión' }
  ];

  constructor() { }

  onStepChanged(step: number) {
    this.stepChanged.emit(step);
  }


  //debes hacer que se guarde en localStorage los datos o algo asi, porque se borra el framework seleccionado cuando pasamos de step

}
