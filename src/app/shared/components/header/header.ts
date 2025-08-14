import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, Logo],
  templateUrl: './header.html',
})
export class Header {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['login']);
  }
}
