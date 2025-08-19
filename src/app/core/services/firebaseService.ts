import { Injectable } from '@angular/core';
// interfaces
import { User } from '@angular/fire/auth';
import { Snippet } from '../interfaces/Snippet';
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
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private snippetsCollection: CollectionReference<DocumentData>;
  private usersCollection: CollectionReference<DocumentData>;

  constructor(private fireStore: Firestore) {
    try {
      this.snippetsCollection = collection(this.fireStore, 'Snippets');
      this.usersCollection = collection(this.fireStore, 'Users');
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

  async getSnippets(): Promise<Snippet[]> {
    try {
      const querySnapshot = await getDocs(this.snippetsCollection);
      const snippets: Snippet[] = [];
      querySnapshot.forEach((doc) => {
        snippets.push(doc.data() as Snippet);
      });
      return snippets;
    } catch (err: any) {
      console.error('Error al obtener snippets:', err);
      throw err;
    }
  }

  // --------- users collection ----------
  async getUserByUID(uid: string) {
    try {
      const userRef = doc(this.usersCollection, uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data() as User;
      } else {
        console.log('No se encontró el usuario con UID:', uid);
        return null;
      }
    } catch (err: any) {
      console.error('Error al obtener usuario por UID:', err);
      throw err;
    }
  }
}
