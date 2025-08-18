import { Component } from '@angular/core';
import { Filters } from './components/filters/filters';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snippets',
  standalone: true,
  imports: [Filters, CommonModule],
  templateUrl: './snippets.html',
})
export class Snippets {

}
