import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Logo } from '../logo/logo';
import { AuthService } from '@/app/core/services/authService';
import { ButtonAvatarHeader } from '../button-avatar-header/button-avatar-header';
import { CommonModule } from '@angular/common';
import { SnippetLoading } from '../snippet-loading/snippet-loading';
import { ButtonIa } from './button-ia/button-ia';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    Logo,
    ButtonAvatarHeader,
    CommonModule,
    SnippetLoading,
    ButtonIa,
  ],
  templateUrl: './header.html',
})
export class Header {
  isLoggedIn: boolean = false;
  authReady: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.authService.isAuthReady$.subscribe((isReady) => {
      this.authReady = isReady;
      console.log('Auth ready:', isReady);
      this.cdr.markForCheck();
    });

    this.authService.currentUser$.subscribe((user) => {
      this.isLoggedIn = !!user;
      console.log('User logged in:', user);
      this.cdr.markForCheck();
    });
  }

  async logout() {
    console.log('Logout');
    try {
      await this.authService.logout();
      this.backToHome();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  // nagivations to pages
  backToHome() {
    this.router.navigate(['/']);
  }
  navigateToLogin() {
    this.router.navigate(['login']);
  }
  navigateToCreateSnippet() {
    this.router.navigate(['/snippets']);
  }
}
