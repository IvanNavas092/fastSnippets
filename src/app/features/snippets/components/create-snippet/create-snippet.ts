import { Component } from '@angular/core';
import { FirebaseService } from '@/app/core/services/firebaseService';
import { Snippet } from '@/app/core/interfaces/Snippet';
import { StepsForm } from "@/app/features/create-snippet/components/steps-form/steps-form";

@Component({
  selector: 'app-create-snippet',
  imports: [StepsForm],
  templateUrl: './create-snippet.html',
})
export class CreateSnippet {
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
