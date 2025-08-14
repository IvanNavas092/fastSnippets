import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateSnippet } from './features/snippets/components/create-snippet/create-snippet';
import { Header } from "./shared/components/header/header";
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fastSnippets');
}
