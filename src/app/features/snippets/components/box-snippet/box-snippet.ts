import { Snippet } from '@/app/core/interfaces/Snippet';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HighlightPipe } from '@/app/utils/pipes/HighlightPipe';
import { CommonModule } from '@angular/common';
import { CopyButton } from '@/app/shared/components/copy-button/copy-button';
@Component({
  selector: 'app-box-snippet',
  imports: [HighlightPipe, CommonModule, CopyButton],
  templateUrl: './box-snippet.html',
  styles: ``,
})
export class BoxSnippet {
  @Input() snippet!: Snippet;
  @Output() favourite = new EventEmitter<Snippet>();
  toggleFavourite: boolean = false;

  emitFavourite(snippet: Snippet) {
    this.favourite.emit(snippet);
    this.toggleFavourite = !this.toggleFavourite;
  }

  detectIcon(icon: number): string {
    if (icon === 1) {
      return 'angular.svg';
    } else if (icon === 2) {
      return 'react.svg';
    } else if (icon === 3) {
      return 'vue.svg';
    } else if (icon === 4) {
      return 'svelte.svg';
    } else {
      return 'unkown.svg';
    }
  }
}
