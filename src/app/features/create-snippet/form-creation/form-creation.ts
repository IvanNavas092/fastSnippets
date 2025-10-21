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
import { Highlight } from "ngx-highlightjs";
import { SnippetCode } from '@/app/core/interfaces/Snippet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-creation',
  imports: [ReactiveFormsModule, BoxCode, OptionFramework, Highlight, CommonModule],
  templateUrl: './form-creation.html',
})
export class FormCreation {
  @Input() form!: FormGroup;
  @Input() currentStep = 1;
  @Input() codes!: FormArray;

  @Output() nextStepChange = new EventEmitter<void>();
  @Output() prevStepChange = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<void>();
  @Output() frameworkSelected = new EventEmitter<string>();
  @Output() addCode = new EventEmitter<SnippetCode>();
  @Output() removeCode = new EventEmitter<number>();
  @Output() allOkChange = new EventEmitter<boolean>();
  @Output() tagsSubmitted = new EventEmitter<string[]>();

  tagsInput = new FormControl('', Validators.required);
  codeInput = new FormControl('', Validators.required);
  actionInput = new FormControl('', Validators.required);
  introducedTags: string[] = [];

  // state locals
  messageError = '';
  messageErrorTags = '';
  IsMoreThan1 = false


  hasCodes(): boolean {
    console.log(this.form)
    return this.codes && this.codes.length > 0;
  }

  nextStep() {
    if (this.currentStep === 1) {
      const titleValid = this.form.get('title')?.valid;
      const frameworkValid = this.form.get('framework')?.valid;


      if (titleValid && frameworkValid) {
        this.allOkChange.emit(true);
        this.nextStepChange.emit();
        this.messageError = '';
        sessionStorage.setItem('framework', this.form.get('framework')?.value);
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

  handleAddCode() {
    const data: SnippetCode = {
      code: this.codeInput.value?.trim(),
      action: this.actionInput.value?.trim(),
    };
    if (!data.code || !data.action) {
      this.messageError = 'Agrega al menos un código';
      return
    } else {
      this.messageError = '';
      this.addCode.emit(data);
      this.codeInput.reset();
      this.actionInput.reset();

      // check if code has more than 1
      if (this.form.get('codes')?.value?.length > 1) {
        this.IsMoreThan1 = true;
        console.log(this.IsMoreThan1)
      }
    }
  }

  addTag() {
    if (this.introducedTags.length >= 3) {
      this.messageErrorTags = 'Máximo 3 tags permitidos';
      return;
    }
    const tag = this.tagsInput.value?.trim().toLowerCase();
    console.log(tag);
    if (tag && !this.introducedTags.includes(tag)) {
      this.introducedTags.push(tag);
      this.tagsInput.reset();
    }
  }

  removeTag(index: number) {
    this.introducedTags.splice(index, 1);
    this.messageErrorTags = '';
  }

  // detect icon from framework
  detectIcon(icon: string): string {
    if (icon === 'Angular') {
      return 'angular.svg';
    } else if (icon === 'React') {
      return 'react.svg';
    } else if (icon === 'Vue') {
      return 'vue.svg';
    } else if (icon === 'Svelte') {
      return 'svelte.svg';
    } else {
      return 'unkown.svg';
    }
  }

}
