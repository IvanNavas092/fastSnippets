import { ChangeDetectorRef, Component } from '@angular/core';
import { IaAgentService } from '@/app/core/services/ia-agent-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message } from '@/app/core/interfaces/Message';
import { Conversation } from '@/app/core/interfaces/Conversation';
import { send } from 'process';

@Component({
  selector: 'app-ia-agent',
  imports: [FormsModule, CommonModule],
  templateUrl: './ia-agent.html',
  styleUrls: ['./ia-agent.css'],
})
export class IaAgent {
  userInput = '';
  messages: Message[] = [];
  conversations: Conversation[] = [];
  currentConversationId : string | null = null;
  loading = false;

  constructor(
    private iaAgentService: IaAgentService,
    private cdr: ChangeDetectorRef
  ) {}

  submitMessage() {
    const message = this.userInput.trim();

    if (!message) return;
    if (!this.currentConversationId) {
      this.iaAgentService
      .createConversation({
        title: message.trim().substring(0, 20),
      })
      .then((docRef) => {
        this.loading = true;
        this.userInput = '';
        console.log('Conversacion creada con éxito:', docRef.id);
        this.currentConversationId = docRef.id;
        // add message to conversation
        this.sendMessageToFirebase(docRef.id, { sender: 'user', text: message });

        this.sendMessageToIa(docRef.id, message);
      });
    } else {
      this.sendMessageToFirebase(this.currentConversationId, { sender: 'user', text: message });
      this.userInput = '';
      this.loading = true;
      this.sendMessageToIa(this.currentConversationId, message);
    }
  }

  sendMessageToIa(convId: string, message: string) {
    this.iaAgentService.sendMessage(message).subscribe({
      next: (response) => {
        this.sendMessageToFirebase(convId, { sender: 'bot', text: response });
        console.log('entra al next');
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al enviar mensaje:', error);
        this.loading = false;
      },
      complete: () => {
        console.log('entra al complete');
        this.loading = false;
        console.log(this.messages);
      },
    });
  }

  sendMessageToFirebase(conversationId: string, message: Message) {
    this.iaAgentService.addMessage(conversationId, message).then(() => {
      console.log('Mensaje agregado exitosamente a la conversación:', conversationId);
    })
    this.messages.push(message);
  }


}
