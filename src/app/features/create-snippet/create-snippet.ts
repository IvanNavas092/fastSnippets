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
    tags.forEach((tag) => tagsArray.push(this.fb.control(tag)));
    tagsArray.clear();
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
          logo: this.detectFrameworkIcon(rawData.framework),
        },
        codes: rawData.codes.map((c: SnippetCode) => ({
          code: c.code,
          action: c.action,
        })),
        tags: rawData.tags,
      };
      console.log(snippetData);
      this.firebaseService.createSnippet(snippetData);
      this.form.reset();
      this.codes.clear();
      this.activeStep = 1;
    } else {
      this.form.markAllAsTouched();
    }
  }

   // detect icon from framework
  private detectFrameworkIcon(fw: string): string {
    if (fw === 'Angular') {
      return 'svgs-icons-fw/angular.svg';
    } else if (fw === 'React') {
      return 'svgs-icons-fw/react.svg';
    } else if (fw === 'Vue') {
      return 'svgs-icons-fw/vue.svg';
    } else if (fw === 'Svelte') {
      return 'svgs-icons-fw/svelte.svg';
    } else {
      return 'unkown.svg';
    }
  }
}
