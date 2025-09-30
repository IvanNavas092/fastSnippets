import { Conversation } from '@/app/core/interfaces/Conversation';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-conversation-box',
  imports: [],
  templateUrl: './conversation-box.html',
  styles: ``
})
export class ConversationBox {
  conv = input<Conversation>();

}
