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
  @Input() description: string = '';
  
  counts: { angular: number; react: number; vue: number; svelte: number } = { angular: 0, react: 0, vue: 0, svelte: 0 };
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  this.firebaseService.updateCountsFromFirebase();
  this.firebaseService.countsSnippets$.subscribe(counts => {
    this.counts = counts;
    console.log('counts:', counts);
  })
  }

}
