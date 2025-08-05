// src/app/services/auth.service.ts
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // <-- Importar esto
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth'; // O usa 'user' de @angular/fire/auth

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;
  private auth: Auth | null = null; // Puede ser null inicialmente
  private platformId = inject(PLATFORM_ID); // Inyecta el token de plataforma

  constructor() {
    // Ejecuta la lógica de Auth solo si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.auth = inject(Auth); // Aquí se inyecta Auth
      onAuthStateChanged(this.auth, (user) => {
        this.user = user;
      });
      console.log('AuthService: Running in browser, Auth initialized.');
    } else {
      console.log(
        'AuthService: Running in server (SSR), Auth not initialized.'
      );
    }
  }

  // Asegura que todas tus funciones de Auth manejen el caso de que 'this.auth' sea null
  async signIn(email: string, password: string) {
    if (!this.auth) {
      console.warn('Auth service not available in this environment.');
      throw new Error('Authentication service not available.'); // O maneja como prefieras
    }
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signup(email: string, password: string) {
    if (!this.auth) {
      console.warn('Auth service not available in this environment.');
      throw new Error('Authentication service not available.');
    }
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async signOut() {
    if (!this.auth) {
      console.warn('Auth service not available in this environment.');
      // Si no hay auth, simplemente no hay sesión que cerrar.
      return;
    }
    return signOut(this.auth);
  }

  getCurrentUser() {
    return this.user;
  }
}
