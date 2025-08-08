import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '@/app/shared/components/header/header';
import { CircleFrame } from './components/circle-frame/circle-frame';
import { Hero } from './components/hero/hero';
import { CardPopularSnippet } from './components/card-popular-snippet/card-popular-snippet';
// interfaces
import { popularSnippet } from '@/app/core/interfaces/PopularSnippet';
import { framework } from '@/app/core/interfaces/user';
// listas de snippets
import { frameworkList, popularSnippetList } from '@/app/utils/Lists';
@Component({
  selector: 'app-home',
  imports: [Header, CircleFrame, CommonModule, Hero, CardPopularSnippet],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  frameworkList: framework[] = frameworkList;
  popularSnippetList: popularSnippet[] = popularSnippetList;

  ngOnInit(): void {
    console.log(this.popularSnippetList);
  }
}

