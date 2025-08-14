import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { popularSnippet } from '@/app/core/interfaces/PopularSnippet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-popular-snippet',
  imports: [CommonModule],
  templateUrl: './card-popular-snippet.html',
})

export class CardPopularSnippet {
  @Input() item!: popularSnippet;
  copied: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}
  
  copyCode(code: string) {
    navigator.clipboard.writeText(code);
    this.copied = true;
    console.log(this.copied);
    setTimeout(() => {
      this.copied = false;
      this.cdr.detectChanges();
    }, 3000);
  }
}
