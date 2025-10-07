import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IaAgentService } from '@/app/core/services/ia-agent-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message } from '@/app/core/interfaces/Message';
import { Conversation } from '@/app/core/interfaces/Conversation';
import { MessageBox } from './components/message-box/message-box';
import { ConversationBox } from './components/conversation-box/conversation-box';
import { ButtonSidebar } from './components/button-sidebar/button-sidebar';
import { ReversePipe } from '@/app/shared/pipes/reverse';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  finalize,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-ia-agent',
  imports: [
    FormsModule,
    CommonModule,
    MessageBox,
    ConversationBox,
    ButtonSidebar,
    ReversePipe,
  ],
  templateUrl: './ia-agent.html',
})
export class IaAgent implements OnInit {
  @ViewChild('chatBox') chatBox!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  // subject for selected conversation id
  private selectedConversationId$ = new BehaviorSubject<string | undefined>(
    undefined
  );

  // observables
  conversations$!: Observable<Conversation[]>;
  messages$!: Observable<Message[]>;
  currentConversationId$: Observable<string | undefined> =
    this.selectedConversationId$.asObservable();

  // local state
  userInput = '';
  isLoading = false;
  clickedHistory = true;
  messageError = '';
  shouldScroll = false;
  isOpenSidebar = false;

  constructor(
    private iaAgentService: IaAgentService,
  ) {}

  ngOnInit(): void {
    this.initializeStreams();
  }


  // initialize observables
  private initializeStreams() {
    // conversations
    this.conversations$ = this.iaAgentService.getConversations().pipe(
      tap((conversations) => console.log('Loaded conversations:', conversations))
    )

    // messages
    this.messages$ = this.currentConversationId$.pipe(
      tap((convId) => {
        console.log('Loading messages of conversation:', convId);
      }),
      switchMap((convId) => {
        if (!convId) return of([]) 
        return this.iaAgentService.getMessagesOfConv(convId).pipe(
          tap((messages) => {
            console.log('Loaded messages:', messages);
          })
        );
      }),
      tap(() => this.scrollToBottom()), // for each new message, scroll to bottom
      catchError((error) => {
        console.error('Error loading messages:', error);
        return of([]);
      })
    );
  }
  // Submit message
  submitMessage() {
    const messageText = this.userInput.trim();
    if (!messageText || this.isLoading) return;

    this.isLoading = true;
    this.userInput = '';
    this.messageError = '';

    // create conversation for emit the idConversation
    const conversationId$ = this.selectedConversationId$.value
      ? of(this.selectedConversationId$.value)
      : from(
          this.iaAgentService.createConversation({
            title: messageText.substring(0, 20),
            timestamp: new Date(),
          })
        ).pipe(
          tap((docRef) => this.selectedConversationId$.next(docRef.id)),
          map((docRef) => docRef.id)
        );

    // cadena with concatMap to ensure order of operations
    conversationId$
      .pipe(
        concatMap((convId) =>
          from(
            this.iaAgentService.addMessage(convId!, {
              sender: 'user',
              text: messageText,
              timestamp: new Date(),
            })
          ).pipe(
            concatMap(() => this.iaAgentService.sendMessage(messageText)),
            concatMap((response) =>
              this.iaAgentService.addMessage(convId!, {
                sender: 'bot',
                text: response.reply,
                timestamp: new Date(),
              })
            )
          )
        ),
        finalize(() => {
          this.isLoading = false;
          this.scrollToBottom();
        }),
        catchError((error) => {
          console.error('Error processing message:', error);
          this.messageError = 'Algo salió mal, inténtalo de nuevo';
          this.isLoading = false;
          return of(null);
        })
      )
      .subscribe();
  }

  loadMessagesInConversation(conversationIdClicked?: string) {
    console.log('Loading conversation:', conversationIdClicked);
    this.selectedConversationId$.next(conversationIdClicked);
    console.log('Selected conversation:', this.selectedConversationId$.value);
  }

  goBack() {
    window.history.back();
  }

  openHistory() {
    this.clickedHistory = !this.clickedHistory;
  }

  toggleSidebar() {
    this.isOpenSidebar = !this.isOpenSidebar;
  }

  openNewChat() {
    this.selectedConversationId$.next(undefined);
    this.userInput = '';
    this.messageError = '';
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.chatBox?.nativeElement) {
        this.chatBox.nativeElement.scrollTop =
          this.chatBox.nativeElement.scrollHeight;
      }
    }, 0);
  }
}

