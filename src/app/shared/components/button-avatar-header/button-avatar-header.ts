import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from '@/app/core/interfaces/Link';
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

  constructor(private router: Router, private authService: AuthService) { }
  links = [
    {
      name: 'Create Snippet',
      action: () => {
        this.router.navigate(['/create-snippet']);
      }
    },
    {
      name: 'Snippets',
      action: () => {
        this.router.navigate(['/snippets']);
      }
    },
    
    {
      name: 'Favourites',
      action: () => {
        this.router.navigate(['/fav-snippets']);
      }
    },
    {
      name: 'Settings',
      action: () => {
        console.log('Abrir settings');
        // aquí iría tu lógica de abrir ajustes
      }
    },
    {
      name: 'Logout',
      action: () => {
        this.authService.logout();
      }
    }
  ];
  

  openMenuHandler() {
    this.openMenu = !this.openMenu;
  }
}
