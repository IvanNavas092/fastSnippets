import { ChangeDetectorRef, Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { IaAgentService } from './core/services/ia-agent-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from './core/services/authService';
import { SnippetLoading } from "./shared/components/snippet-loading/snippet-loading";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, SnippetLoading, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fastSnippets');
  isReady$!: Observable<boolean>;

  constructor(
    private router: Router,
    private iaAgentService: IaAgentService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // loading general
    this.isReady$ = this.authService.isAuthReady$;

    // get token for post requests
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
