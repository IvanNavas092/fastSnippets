import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleFrame } from './components/circle-frame/circle-frame';
import { Hero } from './components/hero/hero';
import { CardPopularSnippet } from './components/card-popular-snippet/card-popular-snippet';
// interfaces
import { aboutItem } from '@/app/core/interfaces/ItemAbout';
import { framework } from '@/app/core/interfaces/Framework';
// listas de snippets
import {
  frameworkList,
  popularSnippetList,
  aboutList,
} from '@/app/utils/Lists';
import { BoxAbout } from './components/box-about/box-about';
import { Cta } from './components/cta/cta';
import { PopularSnippet } from '@/app/core/interfaces/Snippet';
@Component({
  selector: 'app-home',
  imports: [CircleFrame, CommonModule, Hero, CardPopularSnippet, BoxAbout, Cta],
  templateUrl: './home.html',
})
export class Home {
  frameworkList: framework[] = frameworkList;
  popularSnippetList: PopularSnippet[] = popularSnippetList;
  aboutList: aboutItem[] = aboutList;
}
