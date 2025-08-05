import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
})
export class Header {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['login']);
  }
}
