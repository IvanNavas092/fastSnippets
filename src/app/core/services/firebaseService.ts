import { Injectable } from '@angular/core';
// interfaces
import { Snippet, UserSnippet } from '../interfaces/Snippet';
// firebase
import {
  Firestore,
  collection,
  addDoc,
  CollectionReference,
  DocumentData,
  query,
  where,
  CollectionReference as ColRef,
  deleteDoc,
  doc,
  getDocs,
  docData,
} from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private snippetsCollection: CollectionReference<DocumentData>;
  private userSnippetsCollection: CollectionReference<DocumentData>;

  countsSnippets = new BehaviorSubject<{ angular: number; react: number; vue: number; svelte: number }>({
    angular: 0,
    react: 0,
    vue: 0,
    svelte: 0,
  });
  countsSnippets$ = this.countsSnippets.asObservable();

  constructor(private fireStore: Firestore) {
    this.snippetsCollection = collection(this.fireStore, 'Snippets');
    this.userSnippetsCollection = collection(this.fireStore, 'UsersSnippet');
  }

  async createSnippet(snippet: Snippet) {
  if (!snippet.framework) throw new Error('Framework no especificado');

  const docRef = await addDoc(this.snippetsCollection, snippet);
  this.incrementCounter(snippet.framework.name); // solo actualizar después de guardar
  return docRef;
}

  // --------- Obtener snippets públicos ----------
  getSnippets(): Observable<Snippet[]> {
    return collectionData(this.snippetsCollection, {
      idField: 'uid',
    }) as Observable<Snippet[]>;
  }

  getSnippetById(snippetId: string): Observable<Snippet> {
    // 1. Crea una referencia al documento específico usando su ID
    const snippetDocRef = doc(this.fireStore, 'Snippets', snippetId);

    // 2. Usa docData() para obtener los datos de ese documento como un Observable.
    //    Mantén idField: 'uid' para que el ID del documento de Firestore se mapee a tu propiedad 'uid'.
    return docData(snippetDocRef, { idField: 'uid' }) as Observable<Snippet>;
  }

  // --------- Obtener snippets guardados por usuario ----------
  getSavedSnippetsByUser(userId: string): Observable<UserSnippet[]> {
    const q = query(
      this.userSnippetsCollection,
      where('user_uid', '==', userId)
    );

    return collectionData(q, { idField: 'uid' }) as Observable<UserSnippet[]>;
  }

  // save snippet for user
  saveSnippetForUser(userId: string, snippet: Snippet) {
    const userSnippet: UserSnippet = {
      user_uid: userId,
      snippet_uid: snippet.uid,
      created_at: new Date(),
    };
    return addDoc(this.userSnippetsCollection, userSnippet);
  }

  // delete snippet for user
  async deleteSnippetForUser(userId: string, snippetUidToDelete: string) {
    // 1. Construir una consulta para encontrar el documento específico
    //    en la colección 'UsersSnippet' que coincida con el usuario y el snippet.
    const q = query(
      this.userSnippetsCollection,
      where('user_uid', '==', userId),
      where('snippet_uid', '==', snippetUidToDelete)
    );

    try {
      // 2. Ejecutar la consulta para obtener los documentos que coinciden.
      const querySnapshot = await getDocs(q);

      // 3. Verificar si se encontraron documentos.
      if (querySnapshot.empty) {
        console.warn(
          'No se encontró ningún snippet guardado para eliminar con ese usuario y UID de snippet.'
        );
        return; // Salir si no hay nada que borrar
      }

      // 4. Si se encuentran documentos, iterar sobre ellos y eliminarlos.
      //    Normalmente, solo debería haber una coincidencia para una combinación única de usuario-snippet.
      const deletePromises: Promise<void>[] = [];
      querySnapshot.forEach((docSnap) => {
        // Obtenemos la referencia al documento usando su ID real (generado automáticamente)
        const docRefToDelete = doc(this.userSnippetsCollection, docSnap.id);
        deletePromises.push(deleteDoc(docRefToDelete));
      });

      // 5. Esperar a que todas las operaciones de eliminación se completen.
      await Promise.all(deletePromises);
      console.log(
        'Snippet(s) guardado(s) eliminado(s) exitosamente para el usuario:',
        userId,
        'y snippet:',
        snippetUidToDelete
      );
    } catch (error) {
      console.error('Error al eliminar el snippet guardado:', error);
      // Vuelve a lanzar el error para que el componente que llama pueda manejarlo
      throw error;
    }
  }

  updateCountsFromFirebase() {
    getDocs(this.snippetsCollection).then(snapshot => {
      const counts = { angular: 0, react: 0, vue: 0, svelte: 0 };
      snapshot.forEach(doc => {
        const data = doc.data() as Snippet;
        if (data.framework && counts.hasOwnProperty(data.framework.name)) {
          counts[data.framework.name as keyof typeof counts]++;
        }
      });
      this.countsSnippets.next(counts);
      console.log('countsSnippets:', counts);
    });
  }


  incrementCounter(framework: 'angular' | 'react' | 'vue' | 'svelte') {
    const current = this.countsSnippets.value;
    this.countsSnippets.next({
      ...current,
      [framework]: current[framework] + 1,
    });
  }

}
