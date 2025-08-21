import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { Filters } from './components/filters/filters';
import { CommonModule } from '@angular/common';
import { BoxSnippet } from './components/box-snippet/box-snippet';
import { FirebaseService } from '@/app/core/services/firebaseService';
import { Snippet, UserSnippet } from '@/app/core/interfaces/Snippet';
import { ModalSnippet } from './components/modal-snippet/modal-snippet';
import { AuthUser } from '@/app/core/interfaces/user';
import { AuthService } from '@/app/core/services/authService';
@Component({
  selector: 'app-snippets',
  standalone: true,
  imports: [Filters, CommonModule, BoxSnippet, ModalSnippet],
  templateUrl: './snippets.html',
})
export class Snippets implements OnInit {
  AuxSnippetList: Snippet[] = [];
  allSnippets: Snippet[] = [];
  auxSnippetUser: UserSnippet[] = [];
  selectedFramework: string = 'Todos';
  isLoading: boolean = true;
  showModal: boolean = false;
  selectedSnippet!: Snippet;
  CurrentUser: AuthUser | null = null;
  snippetsLoaded: boolean = false; // Nuevo flag para controlar carga completa


  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.loadSnippets();

    // obtain the user
    this.authService.currentUser$.subscribe((user) => {
      this.CurrentUser = user;
      if (user) {
        this.loadSavedSnippets(user.uid);
      }
    });

  }
  // load snippets publics
  loadSnippets() {
    this.isLoading = true;
    this.firebaseService.getSnippets().subscribe({
      next: (data) => {
        console.log('datos',data);
        this.allSnippets = data; 
        this.snippetsLoaded = true;
        this.isLoading = false;
        // apply filter
        this.onFrameworkFilter('Todos');
      },
      error: (err) => {
        console.error('Error al cargar snippets:', err);
        this.snippetsLoaded = true;
        this.isLoading = false;
      },
    });
  }

  onFrameworkFilter(framework: string) {
    this.selectedFramework = framework;

    if (framework === 'Todos') {
      this.AuxSnippetList = [...this.allSnippets];
    } else {
      this.AuxSnippetList = this.allSnippets.filter(
        (snippet) => snippet.framework.toLowerCase() === framework.toLowerCase()
      );
    }
  }

  favouriteSnippet(snippet: Snippet) {
    if (!this.CurrentUser) return;
    console.log(snippet);
    const alreadySaved = this.detectIfUserSavedSnippet(snippet);
    console.log('alreadySaved:', alreadySaved);
    if (alreadySaved) {
      this.firebaseService.deleteSnippetForUser(this.CurrentUser.uid, snippet.uid).then(() => {
        this.auxSnippetUser = this.auxSnippetUser.filter((s) => s.snippet_uid !== snippet.uid);
      });
    } else {
      this.firebaseService.saveSnippetForUser(this.CurrentUser.uid, snippet).then(() => {
        this.auxSnippetUser.push({
          uid: snippet.uid,
          user_uid: this.CurrentUser?.uid,
          snippet_uid: snippet.uid,
          created_at: new Date(),
        });
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
        this.auxSnippetUser = saved;
        console.log('saved:', saved);
      },
      error: (err) => console.error('Error al cargar favoritos:', err),
    });
  }

  // detect if user has saved snippet
  detectIfUserSavedSnippet(snippet: Snippet): boolean {
    return this.auxSnippetUser.some((s) => s.snippet_uid === snippet.uid);
  }

}
