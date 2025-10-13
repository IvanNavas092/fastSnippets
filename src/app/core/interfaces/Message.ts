import { Timestamp } from "firebase/firestore";

export interface Message {
  id?: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Timestamp | Date;
}