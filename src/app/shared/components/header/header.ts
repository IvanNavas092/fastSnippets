import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Logo } from '../logo/logo';
import { AuthService } from '@/app/core/services/authService';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, Logo],
  templateUrl: './header.html',
})
export class Header {
  navigateToCreateSnippet() {
    this.router.navigate(['/snippets']);
  }
  // currentUser: AuthUser | null = null;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService, private cdr: ChangeDetectorRef) {
    this.authService.tokenUser$.subscribe((token) => {
      this.isLoggedIn = !!token;
      this.cdr.detectChanges();
      // this.currentUser = token;
    });
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }
  backToHome() {
    this.router.navigate(['/']);
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
}
