import { Component } from '@angular/core';
import { FirebaseService } from '@/app/core/services/firebaseService';
import { SnippetCode } from '@/app/core/interfaces/Snippet';
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
    private fb: FormBuilder, private firebaseService: FirebaseService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      actions: this.fb.array([]),
      tags: this.fb.array([]),
      framework: ['', Validators.required],
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
    console.log(codeGroup);
    this.codes.push(codeGroup);
    console.log(this.form.value);
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

      const rawData = this.form.value;
      const snippetData = {
        title: rawData.title,
        framework: {
          name: rawData.framework,
        },
        actions: rawData.actions || [],
        code: rawData.codes.map((c: any) => c.code),
      };
      this.firebaseService.createSnippet(snippetData);
      this.form.reset();
      this.codes.clear();
      this.activeStep = 1;
    } else {
      this.form.markAllAsTouched();
    }
  }
}
