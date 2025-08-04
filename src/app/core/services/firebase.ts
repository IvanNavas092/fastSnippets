import { Injectable } from '@angular/core';
import { User, Snippet } from '../interfaces/user';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CollectionReference, DocumentData  } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class Firebase {

  private snippetsCollection: CollectionReference<DocumentData>;

  constructor(private fireStore: Firestore) {
    this.snippetsCollection = collection(fireStore, 'Snippets');
  }

  async createUser(snippet: Snippet) {
    const snippetRef = await addDoc(this.snippetsCollection, snippet);
    console.log('snippet creado con exito', snippetRef.id);
    return snippetRef;
  } catch (err: any) {
    console.error('Error al crear snippet', err);
  }
}
