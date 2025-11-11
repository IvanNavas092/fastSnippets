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


  // detect icon from framework
  detectFrameworkIcon(fw: any): string {
    const name = fw?.name || fw;
    switch (name) {
      case 'Angular': return './svgs-icons-fw/angular.svg';
      case 'React': return './svgs-icons-fw/react.svg';
      case 'Vue': return './svgs-icons-fw/vue.svg';
      case 'Svelte': return './svgs-icons-fw/svelte.svg';
      default: return 'svgs-icons-fw/unknown.svg';
    }
  }


  openModal() {
    this.showModal.emit(this.snippet);
  }
}
