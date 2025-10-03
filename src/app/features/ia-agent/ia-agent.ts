import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
})

export class IaAgent implements OnInit, AfterViewChecked {
  @ViewChild('chatBox') chatBox!: ElementRef;
  userInput = '';
  messages: Message[] = [];
  conversations: Conversation[] = [];
  currentConversationId: string | undefined = undefined;
  isLoading = false;
  clickedHistory = false;
  messageError = '';
  shouldScroll = false;

  constructor(
    private iaAgentService: IaAgentService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }



  ngOnInit(): void {
    this.loadData();
    // if currentConversationId is not null, load messages
    if (this.currentConversationId) {
      this.loadMessagesInConversation();
    }
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
    this.shouldScroll = true;

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
        this.shouldScroll = true;
        this.cdr.markForCheck();

      },
      error: (error) => {
        this.messageError = "Algo salió mal, inténtalo de nuevo";
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

  loadMessagesInConversation() {
    this.iaAgentService.getMessagesOfConv(this.currentConversationId).subscribe((data) => {
      this.messages = data;
      this.cdr.markForCheck();
    });
  }

  goBack() {
    window.history.back();
  }

  openHistory() {
    this.clickedHistory = !this.clickedHistory;
  }

  private scrollToBottom() {
    this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
  }

  isInConversation() {
    return this.currentConversationId !== null;
  }
}
