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

  // --------- relation users snippets collection ----------
  // async getUserSnippets(userId: string | undefined) {
  //   if (!userId) {
  //     console.error('No se proporcionó un ID de usuario');
  //     return;
  //   }
  //   const snippetsRef = collection(
  //     doc(this.fireStore, 'users', userId),
  //     'snippets'
  //   );
  //   const snapshot = await getDocs(snippetsRef);

  //   // Mapear los documentos
  //   return snapshot.docs.map((doc) => doc.data() as Snippet);
  // }

  // async createFavourite(snippetId: string, userId: string) {

  //   try {
  //     const favouriteRef = await addDoc(this.usersCollection
  //       {
  //         snippetId: snippetId,
  //       }
  //     );
  //     console.log('Favourite creado con éxito', favouriteRef.id);
  //     return favouriteRef;
  //   } catch (err: any) {
  //     console.error('Error al crear favourite:', err);
  //     throw err;
  //   }
  // }
}
