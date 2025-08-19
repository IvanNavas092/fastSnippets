import { Component, Input } from '@angular/core';
import { HighlightPipe } from '@/app/utils/pipes/HighlightPipe';
import { CopyButton } from '@/app/shared/components/copy-button/copy-button';
import { Snippet } from '@/app/core/interfaces/Snippet';

@Component({
  selector: 'app-view-snippet-modal',
  imports: [HighlightPipe, CopyButton],
  templateUrl: './view-snippet-modal.html',
  styles: ``,
})
export class ViewSnippetModal {
  @Input() snippet!: Snippet;
}
