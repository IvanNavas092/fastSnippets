import { Component } from '@angular/core';
import { FirebaseService } from '@/app/core/services/firebaseService';
import { Snippet } from '@/app/core/interfaces/Snippet';
import { StepsForm } from "@/app/features/create-snippet/components/steps-form/steps-form";
import { FormCreation } from "./form-creation/form-creation";

@Component({
  selector: 'app-create-snippet',
  imports: [StepsForm, FormCreation],
  templateUrl: './create-snippet.html',
})
export class CreateSnippet {
  activeStep: number = 1;

  snippet: Snippet = {
    uid: '',
    title: '',
    icon: 0,
    framework: '',
    actions: [''],
    code: [''],
  };
  constructor(private firebase: FirebaseService) {}

  createSnippet() {
    this.firebase.createSnippet(this.snippet).then((res) => {
      console.log('snippet creado con exito', res);
    });
  }
}
