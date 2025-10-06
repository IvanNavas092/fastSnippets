import { Timestamp } from "@angular/fire/firestore";

export interface Conversation {
  id?: string;
  title: string;
  timestamp: Timestamp | Date
}