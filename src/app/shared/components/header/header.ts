import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Logo } from '../logo/logo';
import { AuthService } from '@/app/core/services/authService';
import { ButtonAvatarHeader } from '../button-avatar-header/button-avatar-header';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, Logo, ButtonAvatarHeader, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  // currentUser: AuthUser | null = null;
  isLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser$.subscribe((user) => {
      this.isLoggedIn = !!user;
      console.log('User logged in:', user);
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
  navigateToFavSnippets() {
    this.router.navigate(['/fav-snippets']);
  }
}
