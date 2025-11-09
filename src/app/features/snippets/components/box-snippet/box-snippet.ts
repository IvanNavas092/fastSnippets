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

 



  openModal() {
    this.showModal.emit(this.snippet);
  }
}
