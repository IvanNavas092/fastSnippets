import { Snippet } from '@/app/core/interfaces/Snippet';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyButton } from '@/app/shared/components/copy-button/copy-button';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-box-snippet',
  imports: [CommonModule, CopyButton, Highlight],
  templateUrl: './box-snippet.html',
  styles: ``,
})
export class BoxSnippet {
  @Input() snippet!: Snippet;
  // flag for know if user has favourite snippet
  @Input() isFavourite!: boolean;
  @Output() favourite = new EventEmitter<Snippet>();
  @Output() showModal = new EventEmitter<Snippet>();

  emitFavourite(snippet: Snippet) {
    this.favourite.emit(snippet);
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

  

  openModal() {
    this.showModal.emit(this.snippet);
  }
}
