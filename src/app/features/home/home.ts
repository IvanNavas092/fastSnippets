import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '@/app/shared/components/header/header';
import { CircleFrame } from './components/circle-frame/circle-frame';
import { Hero } from './components/hero/hero';
import { CardPopularSnippet } from './components/card-popular-snippet/card-popular-snippet';
// interfaces
import { aboutItem, popularSnippet } from '@/app/core/interfaces/PopularSnippet';
import { framework } from '@/app/core/interfaces/user';
// listas de snippets
import { frameworkList, popularSnippetList, aboutList } from '@/app/utils/Lists';
import { BoxAbout } from './components/box-about/box-about';
import { Cta } from './components/cta/cta';
@Component({
  selector: 'app-home',
  imports: [Header, CircleFrame, CommonModule, Hero, CardPopularSnippet, BoxAbout, Cta],
  templateUrl: './home.html',
})
export class Home  {
  frameworkList: framework[] = frameworkList;
  popularSnippetList: popularSnippet[] = popularSnippetList;
  aboutList: aboutItem[] = aboutList;
}

