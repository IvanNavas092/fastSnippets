import { Component } from '@angular/core';
import { Header } from '@/app/shared/components/header/header';
import { CircleFrame } from './components/circle-frame/circle-frame';
import { framework } from '@/app/core/interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Header, CircleFrame, CommonModule],
  templateUrl: './home.html',
})
export class Home {
  frameworkList: framework[] = [
    {
      id: '1',
      name: 'Angular',
      logo: 'angular.svg',
    },
    {
      id: '2',
      name: 'React',
      logo: 'react.svg',
    },
    {
      id: '3',
      name: 'Vue',
      logo: 'vue.svg',
    },
    {
      id: '4',
      name: 'Svelte',
      logo: 'svelte.svg',
    },
  ];
}
