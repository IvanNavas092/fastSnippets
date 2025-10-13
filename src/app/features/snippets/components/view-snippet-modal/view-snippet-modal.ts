import { Component, Input } from '@angular/core';
import { HighlightPipe } from '@/app/utils/pipes/HighlightPipe';
import { CopyButton } from '@/app/shared/components/copy-button/copy-button';
import { Snippet } from '@/app/core/interfaces/Snippet';
import { Highlight } from "ngx-highlightjs";

@Component({
  selector: 'app-view-snippet-modal',
  imports: [HighlightPipe, CopyButton, Highlight],
  templateUrl: './view-snippet-modal.html',
  styles: ``,
})
export class ViewSnippetModal {
  @Input() snippet!: Snippet;
}
