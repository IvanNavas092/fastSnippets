import { Component } from '@angular/core';
import { Firebase } from '../../../../core/services/firebase';
import { User, Snippet } from '../../../../core/interfaces/user';
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
  constructor(private firebase: Firebase) {
    
  }

  createSnippet() {
    this.firebase.createUser(this.snippet).then((res) => {
      console.log('snippet creado con exito', res);
    });
  }
}
