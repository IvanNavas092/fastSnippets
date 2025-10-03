import { Conversation } from '@/app/core/interfaces/Conversation';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-conversation-box',
  imports: [],
  templateUrl: './conversation-box.html',
})
export class ConversationBox {
  conv = input<Conversation>();
  idConversation = output<string | undefined>();

  getIdConversation() {
    this.idConversation.emit(this.conv()?.id);
  }

}
