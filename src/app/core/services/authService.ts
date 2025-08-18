import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  updateProfile,
} from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth'; // O usa 'user' de @angular/fire/auth
import { BehaviorSubject } from 'rxjs';
import { AuthUser } from '../interfaces/user';
import { FirebaseService } from './firebaseService';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: AuthUser | null = null;
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();


  constructor(private firebaseService: FirebaseService,  private afAuth: Auth) {
    
      onAuthStateChanged(this.afAuth, (user) => {
        const mappedUser = user ? this.mapAuthUser(user) : null;
        this.currentUserSubject.next(mappedUser);
      });
      console.log('AuthService: Running in browser, Auth initialized.');
    }

  // Asegura que todas tus funciones de Auth manejen el caso de que 'this.auth' sea null
  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.afAuth, email, password);
      console.log('Usuario ha iniciado sesión correctamente');
      this.currentUserSubject.next(this.mapAuthUser(userCredential.user));
      console.log('Usuario:', this.currentUserSubject.value);
      return userCredential;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  async signup(email: string, password: string, username?: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.afAuth, email, password);
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

  async signOut() {
    return signOut(this.afAuth);
  }

  getCurrentUser() {
    this.firebaseService.getUserByUID(this.user!.uid).then((user) => {
      this.currentUserSubject.next(this.user);
      console.log('Usuario:', this.currentUserSubject.value);
    });
  }

  // === Helpers ===
  private mapAuthUser(user: User): AuthUser {
    return {
      uid: user.uid,
      email: user.email,
      username: user.displayName,
      avatar: user.photoURL,
      password: null,
      favourites_id: [],
    };
  }
}
