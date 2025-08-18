import { Component } from '@angular/core';
import { FirebaseService } from '@/app/core/services/firebaseService';
import { Snippet } from '@/app/core/interfaces/Snippet';
@Component({
  selector: 'app-create-snippet',
  imports: [],
  templateUrl: './create-snippet.html',
})
export class CreateSnippet {
  snippet: Snippet = {
    name: '',
    description: '',
    code: '',
  };
  constructor(private firebase: FirebaseService) {}

  createSnippet() {
    this.firebase.createSnippet(this.snippet).then((res) => {
      console.log('snippet creado con exito', res);
    });
  }
}
