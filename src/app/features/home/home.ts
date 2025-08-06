import { Component } from '@angular/core';
import { Header } from '@/app/shared/components/header/header';
import { CircleFrame } from './components/circle-frame/circle-frame';
import { framework } from '@/app/core/interfaces/user';
import { CommonModule } from '@angular/common';
import { Hero } from './components/hero/hero';
@Component({
  selector: 'app-home',
  imports: [Header, CircleFrame, CommonModule ,Hero],
  templateUrl: './home.html',
})
export class Home {
  frameworkList: framework[] = [
    {
      id: '1',
      name: 'Angular',
      logo: 'angular.svg',
      description: 'Componentes, servicios, directivas y más',
    },
    {
      id: '2',
      name: 'React',
      logo: 'react.svg',
      description: 'Hooks, componentes, contextos y más',
    },
    {
      id: '3',
      name: 'Vue',
      logo: 'vue.svg',
      description: 'Composition API, componentes, directivas',
    },
    {
      id: '4',
      name: 'Svelte',
      logo: 'svelte.svg',
      description: 'Componentes, directivas y más',
    },
  ];
}
