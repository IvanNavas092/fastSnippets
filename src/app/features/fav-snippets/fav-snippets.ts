import { Snippet, UserSnippet } from '@/app/core/interfaces/Snippet';
import { AuthUser } from '@/app/core/interfaces/user';
import { AuthService } from '@/app/core/services/authService';
import { FirebaseService } from '@/app/core/services/firebaseService';
import { Component } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { BoxSnippet } from '../snippets/components/box-snippet/box-snippet';
import { Snippets } from '../snippets/snippets';

@Component({
  selector: 'app-fav-snippets',
  imports: [BoxSnippet],
  templateUrl: './fav-snippets.html',
})
export class FavSnippets {
  snippetsUser: UserSnippet[] = [];
  currentUser: AuthUser | null = null;
  snippetsUserObjects: Snippets[] = []

  constructor(private firebaseService: FirebaseService, private authService: AuthService) {
    this.authService.currentUser$.pipe(
      switchMap((user) => {
        this.currentUser = user;
        return user ? this.firebaseService.getSavedSnippetsByUser(user.uid) : of([]);
      }),
      switchMap((saved: UserSnippet[]) => {
        this.snippetsUser = saved;
        // 👇 ahora obtenemos los Snippets reales
        if (saved.length === 0) return of([]);
    
        return this.firebaseService.getSnippetsById(saved.map(s => s.snippetId));
      })
    ).subscribe({
      next: (snippets: Snippet[]) => {
        this.snippets = snippets; // aquí ya tienes los Snippets "puros"
      },
      error: (err) => console.error('Error al cargar favoritos:', err),
    })

  }

}
