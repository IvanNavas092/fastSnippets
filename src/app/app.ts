import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { IaAgentService } from './core/services/ia-agent-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fastSnippets');

  constructor(
    private router: Router,
    private iaAgentService: IaAgentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.getToken();
  }
  get isLoginRoute(): boolean {
    const routes = ['/login', '/ia-agent'];
    return routes.some(route => this.router.url.startsWith(route));
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      this.iaAgentService.getToken().subscribe((token) => {
        console.log('token', token);
      });
    }
  }
}
