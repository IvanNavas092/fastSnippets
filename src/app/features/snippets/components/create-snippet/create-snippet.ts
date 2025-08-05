import { Component } from '@angular/core';
import { Firebase } from '@/app/core/services/firebase';
import { Snippet } from '@/app/core/interfaces/user';
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
  constructor(private firebase: Firebase) {}

  createSnippet() {
    this.firebase.createSnippet(this.snippet).then((res) => {
      console.log('snippet creado con exito', res);
    });
  }
}
