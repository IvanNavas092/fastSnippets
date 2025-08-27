import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-avatar-header',
  imports: [],
  templateUrl: './button-avatar-header.html',
  styles: ``,
})
export class ButtonAvatarHeader {
  @Input() image: string = 'angular.svg';
  openMenu: boolean = false;

  links = [
    {
      name: 'Create Snippet',
      url: '',
    },
    {
      name: 'Favourites',
      url: '',
    },
    {
      name: 'Settings',
      url: '',
    },
    {
      name: 'Logout',
      url: '',
    },
  ];

  openMenuHandler() {
    this.openMenu = !this.openMenu;
  }
}
