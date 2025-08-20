import { Injectable } from '@angular/core';
// interfaces
import { User } from '@angular/fire/auth';
import { Snippet, UserSnippet } from '../interfaces/Snippet';
// firebase
import {
  Firestore,
  collection,
  addDoc,
  doc,
  getDoc,
  CollectionReference,
  DocumentData,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private snippetsCollection: CollectionReference<DocumentData>;
  private userSnippetsCollection: CollectionReference<DocumentData>;

  constructor(private fireStore: Firestore) {
    try {
      this.snippetsCollection = collection(this.fireStore, 'Snippets');
      this.userSnippetsCollection = collection(this.fireStore, 'UsersSnippet');
    } catch (error) {
      console.error('Error al inicializar las colecciones de Firebase:', error);
      throw error;
    }
  }

  // --------- snippets collection ----------
  async createSnippet(snippet: Snippet) {
    try {
      const snippetRef = await addDoc(this.snippetsCollection, snippet);
      console.log('Snippet creado con éxito', snippetRef.id);
      return snippetRef;
    } catch (err: any) {
      console.error('Error al crear snippet:', err);
      throw err;
    }
  }

  // --------- get public snippets ---------
  async getSnippets(): Promise<Snippet[]> {
    try {
      const querySnapshot = await getDocs(this.snippetsCollection);
      const snippets: Snippet[] = [];
      querySnapshot.forEach((doc) => {
        snippets.push({ uid: doc.id, ...doc.data() } as Snippet);
      });
      return snippets;
    } catch (err: any) {
      console.error('Error al obtener snippets:', err);
      throw err;
    }
  }

  // --------- users collection favourites ----------
  async getSavedSnippetsByUser(user_uid: string): Promise<UserSnippet[]> {
    try {
      const q = query(this.userSnippetsCollection, where('user_uid', "==", user_uid));
      const querySnapshot = await getDocs(q);
      const saved: UserSnippet[] = [];
      querySnapshot.forEach(doc => saved.push(doc.data() as UserSnippet));
      return saved;
    } catch (err: any) {
      console.error('Error al obtener snippets del usuario:', err);
      throw err;
    }
  }
}
