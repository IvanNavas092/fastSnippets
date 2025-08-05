import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-frame',
  imports: [],
  templateUrl: './circle-frame.html',
})
export class CircleFrame {
  @Input() title: string = '';
  @Input() icon: string | undefined = undefined;
}
