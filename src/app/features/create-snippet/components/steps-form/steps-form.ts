import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-steps-form',
  imports: [],
  templateUrl: './steps-form.html',
  styles: ``
})
export class StepsForm {
  @Input() step!: number;


}
