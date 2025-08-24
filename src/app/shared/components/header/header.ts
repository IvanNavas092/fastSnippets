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
  // currentUser: AuthUser | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.authService.tokenUser$.subscribe((token) => {
      this.isLoggedIn = !!token;
      // this.cdr.detectChanges();
      // this.currentUser = token;
    });
  }

  backToHome() {
    this.router.navigate(['/']);
  }
  navigateToLogin() {
    this.router.navigate(['login']);
  }
  navigateToCreateSnippet() {
    this.router.navigate(['/snippets']);
  }
  navigateToFavSnippets() {
    this.router.navigate(['/fav-snippets']);
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
