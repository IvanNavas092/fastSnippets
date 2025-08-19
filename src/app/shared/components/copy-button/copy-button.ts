import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-button',
  imports: [],
  templateUrl: './copy-button.html',
  styles: ``,
})
export class CopyButton {
  // code to copy
  @Input() code!: string[];
  copied: boolean = false;

  copyCode(code: string): void {
    navigator.clipboard.writeText(code);
    this.copied = true;

    setTimeout(() => {
      this.copied = false;
    }, 3000);
  }
}
