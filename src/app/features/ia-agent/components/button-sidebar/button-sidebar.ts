import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button-sidebar',
  imports: [],
  templateUrl: './button-sidebar.html',
  styles: ``,
})
export class ButtonSidebar {
  isInput = input<boolean>();
  type = input<string>();
  text = input<string>();
  icon = input<string>();
  placeholder = input<string>();
  clicked = output<boolean>();

}
