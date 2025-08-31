import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  updateProfile,
} from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';

import { BehaviorSubject } from 'rxjs';
import { AuthUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: AuthUser | null = null;
  // subjects
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private _isAuthReady = new BehaviorSubject<boolean>(false);
  isAuthReady$ = this._isAuthReady.asObservable();

  constructor(
    private afAuth: Auth,
  ) {
    onAuthStateChanged(this.afAuth, (user: any) => {
      console.log('USUARIO CAMBIADO: User:', user);

      const mappedUser = user ? this.mapAuthUser(user) : null;
      this.currentUserSubject.next(mappedUser);
      if (!this._isAuthReady.value) {
        this._isAuthReady.next(true);
      }
    });
    console.log('AuthService: Running in browser, Auth initialized.');
  }

  // Asegura que todas tus funciones de Auth manejen el caso de que 'this.auth' sea null
  async signIn(email: string, password: string) {
    try {
      setPersistence(this.afAuth, browserLocalPersistence)
      .then(() => console.log('Persistencia de Firebase Auth configurada a local (desde constructor).'))
      .catch(error => console.error('Error al configurar la persistencia de Firebase Auth:', error));

      const userCredential = await signInWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      this.currentUserSubject.next(this.mapAuthUser(userCredential.user));
      return userCredential;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  async signup(email: string, password: string, username?: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      // Si se proporciona un nombre de usuario, podríamos actualizar el perfil del usuario
      // o almacenarlo en Firestore si es necesario
      if (username && userCredential.user) {
        console.log(`Usuario creado con nombre: ${username}`);
        // Actualizar el perfil del usuario con el nombre de usuario
        await updateProfile(userCredential.user, { displayName: username });
      }
      return userCredential;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  async logout() {
    await signOut(this.afAuth);
    this.currentUserSubject.next(null);

    console.log('Usuario desconectado');
  }

  // === Helpers ===
  private mapAuthUser(user: User): AuthUser {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      isAnonymous: user.isAnonymous,
      creationTime: user.metadata.creationTime,
    };
  }

}
