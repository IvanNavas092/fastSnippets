import { Component, Input } from '@angular/core';
import { PopularSnippet } from '@/app/core/interfaces/Snippet';
import { CommonModule } from '@angular/common';
import { CopyButton } from '@/app/shared/components/copy-button/copy-button';

@Component({
  selector: 'app-card-popular-snippet',
  imports: [CommonModule, CopyButton],
  templateUrl: './card-popular-snippet.html',
})
export class CardPopularSnippet {
  @Input() item!: PopularSnippet;
}
