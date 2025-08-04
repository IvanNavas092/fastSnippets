import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.html',
})
export class Logo {
  @Input() width: number = 6;
  @Input() height: number = 6;

}
