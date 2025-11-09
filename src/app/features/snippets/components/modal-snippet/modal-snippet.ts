import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ViewSnippetModal } from '../view-snippet-modal/view-snippet-modal';
import { Snippet } from '@/app/core/interfaces/Snippet';

@Component({
  selector: 'app-modal-snippet',
  imports: [CommonModule, ViewSnippetModal],
  templateUrl: './modal-snippet.html',
})
export class ModalSnippet {
  @Input() snippet!: Snippet;
  @Output() disabledModal = new EventEmitter<boolean>();
}
