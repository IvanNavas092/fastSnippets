import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Filters } from './components/filters/filters';
import { CommonModule } from '@angular/common';
import { BoxSnippet } from './components/box-snippet/box-snippet';
import { FirebaseService } from '@/app/core/services/firebaseService';
import { Snippet, UserSnippet } from '@/app/core/interfaces/Snippet';
import { ModalSnippet } from './components/modal-snippet/modal-snippet';
import { AuthUser } from '@/app/core/interfaces/user';
import { AuthService } from '@/app/core/services/authService';
import { Observable, of, switchMap, take } from 'rxjs';
import { SnippetLoading } from "@/app/shared/components/snippet-loading/snippet-loading";

@Component({
  selector: 'app-snippets',
  standalone: true,
  imports: [Filters, CommonModule, BoxSnippet, ModalSnippet, SnippetLoading],
  templateUrl: './snippets.html',
})
export class Snippets implements OnInit {
  AuxSnippetList: Snippet[] = [];
  allSnippets: Snippet[] = [];
  auxSnippetUser$: Observable<UserSnippet[]> = of([]); 

  selectedFramework: string = 'Todos';
  isLoading: boolean = true;
  showModal: boolean = false;
  selectedSnippet!: Snippet;
  CurrentUser: AuthUser | null = null;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadSnippets();

    // obtain the user
    this.authService.currentUser$.pipe(
      switchMap((user) => {
        this.CurrentUser = user;
        return user ? this.firebaseService.getSavedSnippetsByUser(user.uid) : of([]);
      })
    ).subscribe({
      next: (saved) => {
        this.auxSnippetUser$ = of(saved);
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error al cargar favoritos:', err),
    })

  }
  // load snippets publics
  loadSnippets() {
    this.isLoading = true;

    this.firebaseService.getSnippets().subscribe({
      next: (data) => {
        this.allSnippets = data;
        this.isLoading = false;
        this.onFrameworkFilter('Todos');
        this.cdr.markForCheck();

      },
      error: (err) => {
        console.error('Error al cargar snippets:', err);
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  onFrameworkFilter(framework: string) {
    this.selectedFramework = framework;

    if (framework === 'Todos') {
      this.AuxSnippetList = [...this.allSnippets];
      console.log(this.AuxSnippetList);
    } else {
      this.AuxSnippetList = this.allSnippets.filter(
        (snippet) => snippet.framework.name.toLowerCase() === framework.toLowerCase()
      );
    }
  }

  favouriteSnippet(snippet: Snippet) {
    if (!this.CurrentUser) return;

    const alreadySaved = this.detectIfUserSavedSnippet(snippet);
    console.log('alreadySaved:', alreadySaved);

    if (alreadySaved) {
      this.firebaseService
        .deleteSnippetForUser(this.CurrentUser.uid, snippet.uid)
        .then(() => {
        });
    } else {
      this.firebaseService
        .saveSnippetForUser(this.CurrentUser.uid, snippet)
        .then(() => {

        });
    }
  }


  onSearch(search: string) {
    this.AuxSnippetList = this.allSnippets.filter((s) =>
      s.title.toLowerCase().includes(search.toLowerCase())
    );
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

  // load snippets saved by user
  loadSavedSnippets(userId: string): void {
    this.firebaseService.getSavedSnippetsByUser(userId).subscribe({
      next: (saved) => {
        this.auxSnippetUser$ = of(saved);
        console.log('saved:', saved);
      },
      error: (err) => console.error('Error al cargar favoritos:', err),
    });
  }

  // detect if user has saved snippet
  detectIfUserSavedSnippet(snippet: Snippet): boolean {
    let pene = false;
    this.auxSnippetUser$.subscribe(aux => {
      pene = !!aux.find(s => s.snippet_uid === snippet.uid);
    })
    return pene
  }
}
