import { framework, FrameworkType } from '@/app/core/interfaces/Framework';
import { FirebaseService } from '@/app/core/services/firebaseService';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle-frame',
  imports: [],
  templateUrl: './circle-frame.html',
})
export class CircleFrame implements OnInit {
  @Input() title!: FrameworkType;
  @Input() icon: string | undefined = undefined;
  @Input() description?: string = '';
  
  counts: { Angular: number; React: number; Vue: number; Svelte: number } = { Angular: 0, React: 0, Vue: 0, Svelte: 0 };
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  this.firebaseService.updateCountsFromFirebase();
  this.firebaseService.countsSnippets$.subscribe(counts => {
    this.counts = counts;
  })
  }

}
