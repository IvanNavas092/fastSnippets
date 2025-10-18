import { Component, Output } from '@angular/core';
import {  ReactiveFormsModule, } from '@angular/forms';
import { StepData } from "./components/step-data/step-data";

@Component({
  selector: 'app-form-creation',
  imports: [ReactiveFormsModule, StepData],
  templateUrl: './form-creation.html',
})

export class FormCreation {
  activeStep: number = 1;


}
