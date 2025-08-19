import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Filters } from './components/filters/filters';
import { CommonModule } from '@angular/common';
import { popularSnippetList } from '@/app/utils/Lists';
import { BoxSnippet } from './components/box-snippet/box-snippet';
import { FirebaseService } from '@/app/core/services/firebaseService';
import { Snippet } from '@/app/core/interfaces/Snippet';
import { ModalSnippet } from './components/modal-snippet/modal-snippet';
@Component({
  selector: 'app-snippets',
  standalone: true,
  imports: [Filters, CommonModule, BoxSnippet, ModalSnippet],
  templateUrl: './snippets.html',
})
export class Snippets implements OnInit {
  AuxSnippetList: Snippet[] = [];
  allSnippets: Snippet[] = [];
  selectedFramework: string = 'Todos';
  isLoading: boolean = true;
  showModal: boolean = false;
  selectedSnippet!: Snippet;

  constructor(
    private firebaseService: FirebaseService,
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
      console.log('data:', data);
      this.allSnippets = data;
      // Aplicar el filtro 'Todos' por defecto
      this.onFrameworkFilter('Todos');
      this.isLoading = false;
      this.cdr.detectChanges();
      console.log('Snippets cargados:', data);
    } catch (error) {
      console.error('Error al cargar snippets:', error);
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  onFrameworkFilter(framework: string) {
    this.selectedFramework = framework;
    console.log('Filtrando por framework:', framework);

    if (framework === 'Todos') {
      this.AuxSnippetList = this.allSnippets;
      console.log('AuxSnippetList:', this.AuxSnippetList);
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
    console.log('onSearch', search);
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
}
