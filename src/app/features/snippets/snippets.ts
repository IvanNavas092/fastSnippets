import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSnippets();
    
  }

  async loadSnippets() {
    try {
      this.isLoading = true;
      const data = await this.firebaseService.getSnippets();
      this.isLoading = false;
      this.allSnippets = data;
      // apply filter === 'Todos'
      this.isLoading = false;
      this.cdr.detectChanges();

      // obtain snippets user
      this.authService.currentUser$.subscribe((user) => {
        this.CurrentUser = user;
        if (user) {
          this.loadSavedSnippets();
        }
      });
      
      
    } catch (error) {
      console.error('Error al cargar snippets:', error);
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  onFrameworkFilter(framework: string) {
    this.selectedFramework = framework;

    if (framework === 'Todos') {
      this.AuxSnippetList = this.allSnippets;
    } else {
      this.AuxSnippetList = this.allSnippets.filter(
        (snippet) => snippet.framework.toLowerCase() === framework.toLowerCase()
      );
    }
  }

  favouriteSnippet(snippet: Snippet) {
    console.log('Favorito:', snippet);
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
  }

  loadSavedSnippets(): void {
    this.firebaseService.getSavedSnippetsByUser('vrxNXgu37YWPwZAEhwGTq82grSW2').then((saved) => {
      this.auxSnippetUser = saved;
      console.log('saved:', saved);
      this.cdr.detectChanges();
    });
  }

  // detect if user has saved snippet
  detectIfUserSavedSnippet(snippet: Snippet): boolean {
    if (!this.auxSnippetUser || this.auxSnippetUser.length === 0) {
      return false;
    }
    return this.auxSnippetUser.some((s) => s.snippet_uid === snippet.uid);
  }
  
}
