import { Component, Input } from '@angular/core';
import { popularSnippet } from '@/app/core/interfaces/Snippet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-popular-snippet',
  imports: [CommonModule],
  templateUrl: './card-popular-snippet.html',
})

export class CardPopularSnippet {
  @Input() item!: popularSnippet;

  copied: boolean = false;

  copyCode(code: string): void {
    navigator.clipboard.writeText(code);
    this.copied = true;
    console.log(this.copied);

    setTimeout(() => {
      this.copied = false;
      console.log(this.copied);
    }, 3000);
  }
}
