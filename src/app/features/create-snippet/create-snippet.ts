import { Component } from '@angular/core';
import { FirebaseService } from '@/app/core/services/firebaseService';
import { SnippetCode, SnippetData } from '@/app/core/interfaces/Snippet';
import { StepsForm } from "@/app/features/create-snippet/components/steps-form/steps-form";
import { FormCreation } from "./form-creation/form-creation";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-snippet',
  imports: [StepsForm, FormCreation],
  templateUrl: './create-snippet.html',
})
export class CreateSnippet {
  activeStep = 1;
  allOk = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      tags: [this.fb.array([])],
      framework: ['' , Validators.required],
      codes: this.fb.array([]),
    });
  }

  get codes(): FormArray {
    return this.form.get('codes') as FormArray;
  }

  get tags(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  addCode(data: SnippetCode): void {
    const codeGroup = this.fb.group({
      code: [data.code, Validators.required],
      action: [data.action, [Validators.required, Validators.maxLength(100)]],
    });
    this.codes.push(codeGroup);
  }

  addTags(tags: string[]): void {
    const tagsArray = this.form.get('tags') as FormArray;
    tagsArray.clear();
    tags.forEach((tag) => tagsArray.push(this.fb.control(tag)));
  }

  removeCode(index: number): void {
    this.codes.removeAt(index);
  }

  handleFrameworkSelected(framework: string): void {
    console.log(framework);
    this.form.patchValue({ framework });
  }

   handlePrevStep(): void {
    if (this.activeStep > 1) this.activeStep--;
  }

  handleNextStep(): void {
    if (this.activeStep < 3) this.activeStep++;
  }

  handleSubmit(): void {
    if (this.form.valid) {
      const data = this.form.value as SnippetData;
      console.log('✅ Datos finales:', data);
      // this.firebaseService.saveSnippet(data);
      this.form.reset();
      this.codes.clear();
      this.activeStep = 1;
    } else {
      this.form.markAllAsTouched();
    }
  }


}
