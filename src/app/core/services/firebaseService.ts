import { Injectable } from '@angular/core';
// interfaces
import { createUserWithEmailAndPassword, User } from '@angular/fire/auth';
import { Snippet } from '../interfaces/Snippet';
// firebase
import { Firestore, collection, addDoc, doc, getDoc } from '@angular/fire/firestore';
import { CollectionReference, DocumentData } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private snippetsCollection: CollectionReference<DocumentData>;
  private usersCollection: CollectionReference<DocumentData>;

  constructor(private fireStore: Firestore) {
    this.snippetsCollection = collection(fireStore, 'Snippets');
    this.usersCollection = collection(fireStore, 'Users');
    }

  // --------- snippets collection ----------
  async createSnippet(snippet: Snippet) {
    const snippetRef = await addDoc(this.snippetsCollection, snippet);
    console.log('snippet creado con exito', snippetRef.id);
    return snippetRef;
  }
  catch(err: any) {
    console.error('Error al crear snippet', err);
  }

  // --------- users collection ----------

  async getUserByUID(uid: string) {
    const userRef = doc(this.usersCollection, uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as User;
    } else {
      console.log('No such document!');
      return null;
    }
  }
}
