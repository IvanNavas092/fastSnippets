import { Snippet, UserSnippet } from '@/app/core/interfaces/Snippet';
import { AuthUser } from '@/app/core/interfaces/user';
import { AuthService } from '@/app/core/services/authService';
import { FirebaseService } from '@/app/core/services/firebaseService';
import { ChangeDetectorRef, Component } from '@angular/core';
import { forkJoin, of, switchMap, take } from 'rxjs';
import { BoxSnippet } from '../snippets/components/box-snippet/box-snippet';
import { ModalSnippet } from '../snippets/components/modal-snippet/modal-snippet';
import { CommonModule } from '@angular/common';
import { SnippetLoading } from '@/app/shared/components/snippet-loading/snippet-loading';

@Component({
  selector: 'app-fav-snippets',
  imports: [BoxSnippet, ModalSnippet, CommonModule, SnippetLoading],
  templateUrl: './fav-snippets.html',
})
export class FavSnippets {
  currentUser: AuthUser | null = null;
  snippetsUser: Snippet[] = [];
  selectedSnippet!: Snippet;
  showModal: boolean = false;
  isLoading: boolean = true;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.authService.currentUser$
      .pipe(
        switchMap((user) => {
          this.currentUser = user;
          return user
            ? this.firebaseService.getSavedSnippetsByUser(user.uid)
            : of([]);
        }),

        switchMap((saved: UserSnippet[]) => {
          if (saved.length === 0) return of([]);

          // Llamamos a getSnippetById por cada uid
          const requests = saved.map((s) =>
            this.firebaseService.getSnippetById(s.snippet_uid).pipe(take(1))
          );

          return forkJoin(requests); // → Observable<Snippet[]>
        })
      )
      .subscribe({
        next: (snippets: Snippet[]) => {
          this.snippetsUser = snippets; // snippets that user has saved
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al cargar favoritos:', err),
            (this.isLoading = false);
        },
      });
  }

  openModal(selected: Snippet) {
    this.selectedSnippet = selected;
    this.showModal = true;
    document.body.classList.add('no-scroll');
  }

  closeModal(): void {
    this.showModal = false;
    document.body.classList.remove('no-scroll');
  }
}
