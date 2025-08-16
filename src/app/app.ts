import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
  constructor(private router: Router) { }

  get isLoginRoute(): boolean {
    return this.router.url.startsWith('/login'); // ajusta según tu ruta real
  }
}
