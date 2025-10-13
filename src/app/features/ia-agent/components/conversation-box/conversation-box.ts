import { Conversation } from '@/app/core/interfaces/Conversation';
import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-conversation-box',
  imports: [CommonModule],
  templateUrl: './conversation-box.html',
})
export class ConversationBox {
  conv = input<Conversation>();
  idConversation = output<string | undefined>();
  isActive = input<boolean>();

  getIdConversation() {
    this.idConversation.emit(this.conv()?.id);
  }

}
