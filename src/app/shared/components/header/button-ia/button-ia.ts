import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-button-ia',
  imports: [],
  templateUrl: './button-ia.html',
  styles: ``
})
export class ButtonIa {
  constructor(private router: Router) {}
  
  goToAI() {
    this.router.navigate(['/ia-agent']);
  }
}
