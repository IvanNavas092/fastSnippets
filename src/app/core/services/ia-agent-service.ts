import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable, of } from 'rxjs';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  DocumentData,
  Firestore,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { Message } from '@/app/core/interfaces/Message';
import { Conversation } from '../interfaces/Conversation';
import { ChatResponse } from '@/app/core/interfaces/ChatResponse';
import { AuthService } from './authService';

@Injectable({
  providedIn: 'root',
})
export class IaAgentService {
  private readonly CONVERSATIONS_COLLECTION = 'Conversations';
  private apiUrl = environment.api.url;
  private userId: string | null = null;
  private ConversationCollection: CollectionReference<DocumentData>;

  constructor(private http: HttpClient, private fireStore: Firestore, private authService: AuthService) {
    this.ConversationCollection = collection(
      this.fireStore,
      this.CONVERSATIONS_COLLECTION
    );

    this.authService.currentUser$.subscribe((user) => {
      this.userId = user ? user.uid : null;
    })

  }

  // Firebase Conversations

  // --------- Create Conversation ----------
  createConversation(conversation: Conversation) {
    // if the user not authenticated, throw error
    if (!this.userId) {
      throw new Error('User not authenticated');
    }

    return addDoc(this.ConversationCollection, {
      ...conversation,
      userId: this.userId
    }); 
  }

  // --------- Get Conversations ----------
  getConversations(): Observable<Conversation[]> {
     if (!this.userId) return of([]);

    const userQuery = query(this.ConversationCollection, where('userId', '==', this.userId), orderBy('timestamp', 'desc'))

    return collectionData(userQuery, {
      idField: 'id',
    }) as Observable<Conversation[]>;
  }

  // --------- Get Conversation by ID ----------
  getConversationById(conversationId: string): Observable<Conversation> {
    const conversationRef = doc(
      this.fireStore,
      this.CONVERSATIONS_COLLECTION,
      conversationId
    );
    return docData(conversationRef, {
      idField: 'id',
    }) as Observable<Conversation>;
  }

  // --------- Add Message to a Conversation ----------
  addMessage(convId: string, message: Message) {
    const messagesRef = collection(
      this.fireStore,
      `${this.CONVERSATIONS_COLLECTION}/${convId}/messages`
    );
    return addDoc(messagesRef, message);
  }

  // --------- Get Messages of a Conversation ----------
  getMessagesOfConv(convId: string | undefined): Observable<Message[]> {
    const messagesRef = collection(
      this.fireStore,
      `${this.CONVERSATIONS_COLLECTION}/${convId}/messages`
    );

    const orderedQuery = query(messagesRef, orderBy('timestamp', 'asc'));

    return collectionData(orderedQuery, { idField: 'id' }) as Observable<
      Message[]
    >;
  }

  // DJANGO API Calls

  // --------- Get CSRF Token ----------
  getToken(): Observable<string> {
    return this.http.get<string>(this.apiUrl + 'api/csrf/', {
      withCredentials: true,
    });
  }

  // --------- Send Message to IA Agent ----------
  sendMessage(message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(
      this.apiUrl + 'chat',
      { user_message: message },
      { withCredentials: true }
    );
  }
}
