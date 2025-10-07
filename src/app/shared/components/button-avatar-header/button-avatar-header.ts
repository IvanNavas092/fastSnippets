import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@/app/core/services/authService';

@Component({
  selector: 'app-button-avatar-header',
  imports: [],
  templateUrl: './button-avatar-header.html',
  styles: ``,
})
export class ButtonAvatarHeader {
  @Input() image: string = 'angular.svg';
  openMenu: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}
  links = [
    {
      name: 'Create Snippet',
      action: () => {
        this.router.navigate(['/create-snippet']);
        this.openMenu = false;
      },
      icon: 'svgs-avatar/create.svg',
    },
    {
      name: 'Snippets',
      action: () => {
        this.router.navigate(['/snippets']);
        this.openMenu = false;
      },
      icon: 'svgs-avatar/code.svg',
    },

    {
      name: 'Favourites',
      action: () => {
        this.router.navigate(['/fav-snippets']);
        this.openMenu = false;
      },
      icon: './svgs-avatar/favourite.svg',
    },
    {
      name: 'Settings',
      action: () => {
        console.log('Abrir settings');
        // aquí iría tu lógica de abrir ajustes
        this.openMenu = false;
      },
      icon: 'svgs-avatar/settings.svg',
    },
    {
      name: 'Logout',
      action: () => {
        this.authService.logout();
        this.openMenu = false;
      },
      icon: 'svgs-avatar/logout.svg',
    },
  ];

  openMenuHandler() {
    this.openMenu = !this.openMenu;
  }
}
