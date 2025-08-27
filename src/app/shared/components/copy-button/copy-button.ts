import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-copy-button',
  imports: [LottieComponent, CommonModule],
  templateUrl: './copy-button.html',
  styles: ``,
})
export class CopyButton {
  // code to copy
  @Input() code!: string;
  @Input() black: boolean = false;
  copied: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  options: AnimationOptions = {
    path: '/copied-lottie.json',
    loop: false,
  };

  copyCode(code: string): void {
    navigator.clipboard.writeText(code);
    this.copied = true;

    setTimeout(() => {
      this.copied = false;
      this.cdr.detectChanges();
    }, 3000);
  }
}
