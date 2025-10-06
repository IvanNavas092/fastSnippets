import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  DocumentData,
  Firestore,
} from '@angular/fire/firestore';
import { Message } from '@/app/core/interfaces/Message';
import { Conversation } from '../interfaces/Conversation';
import { ChatResponse } from '@/app/core/interfaces/ChatResponse';

@Injectable({
  providedIn: 'root',
})
export class IaAgentService {
  private readonly CONVERSATIONS_COLLECTION = 'Conversations';
  private apiUrl = environment.api.url;

  private ConsersationCollection: CollectionReference<DocumentData>;

  constructor(private http: HttpClient, private fireStore: Firestore) {
    this.ConsersationCollection = collection(
      this.fireStore,
      this.CONVERSATIONS_COLLECTION
    );
  }

  // Firebase Conversations

  // --------- Create Conversation ----------
  createConversation(conversation: Conversation) {
    return addDoc(this.ConsersationCollection, conversation);
  }

  // --------- Get Conversations ----------
  getConversations(): Observable<Conversation[]> {
    return collectionData(this.ConsersationCollection, {
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

    return collectionData(messagesRef, { idField: 'id' }) as Observable<
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
