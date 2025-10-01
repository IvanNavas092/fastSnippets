import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IaAgentService } from '@/app/core/services/ia-agent-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message } from '@/app/core/interfaces/Message';
import { Conversation } from '@/app/core/interfaces/Conversation';
import { MessageBox } from './components/message-box/message-box';
import { ConversationBox } from './components/conversation-box/conversation-box';
import { ButtonSidebar } from "./components/button-sidebar/button-sidebar";

@Component({
  selector: 'app-ia-agent',
  imports: [FormsModule, CommonModule, MessageBox, ConversationBox, ButtonSidebar],
  templateUrl: './ia-agent.html',
  styleUrls: ['./ia-agent.css'],
})
export class IaAgent implements OnInit {
  userInput = '';
  messages: Message[] = [];
  conversations: Conversation[] = [];
  currentConversationId: string | null = null;
  isLoading = false;
  clickedHistory = false;

  constructor(
    private iaAgentService: IaAgentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  submitMessage() {
    const message = this.userInput.trim();
    if (!message) return;

    if (!this.currentConversationId) {
      this.iaAgentService
        .createConversation({
          title: message.trim().substring(0, 20),
        })
        .then((docRef) => {
          this.isLoading = true;
          this.userInput = '';
          console.log('Conversacion creada con éxito:', docRef.id);
          this.currentConversationId = docRef.id;
          // add message to conversation
          this.sendMessageToFirebase(docRef.id, {
            sender: 'user',
            text: message,
          });

          this.sendMessageToIa(docRef.id, message);
        });
    } else {
      this.sendMessageToFirebase(this.currentConversationId, {
        sender: 'user',
        text: message,
      });
      this.userInput = '';
      this.isLoading = true;
      this.sendMessageToIa(this.currentConversationId, message);
    }
  }

  sendMessageToIa(convId: string, message: string) {
    this.iaAgentService.sendMessage(message).subscribe({
      next: (response) => {
        this.sendMessageToFirebase(convId, {
          sender: 'bot',
          text: response.reply,
        });
        console.log('entra al next');
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al enviar mensaje:', error);
        this.isLoading = false;
      },
      complete: () => {
        console.log('entra al complete');
        this.isLoading = false;
      },
    });
  }

  sendMessageToFirebase(conversationId: string, message: Message) {
    this.iaAgentService.addMessage(conversationId, message).then(() => {
      console.log(
        'Mensaje agregado exitosamente a la conversación:',
        conversationId
      );
    });
    this.messages = [...this.messages, message];
  }

  loadData() {
    this.iaAgentService.getConversations().subscribe((data) => {
      this.conversations = data;
      this.cdr.markForCheck();
    });
  }

  goBack() {
    window.history.back();
  }

  openHistory() {
    this.clickedHistory = !this.clickedHistory;
  }
}
