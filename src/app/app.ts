import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateSnippet } from './features/snippets/components/create-snippet/create-snippet';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateSnippet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('fastSnippets');
}
