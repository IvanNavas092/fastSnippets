import { Routes } from '@angular/router';
import { Home } from './features/home/home';
export const routes: Routes = [
  {path:'', component: Home },
  // el load component es como el loadChildren pero con componentes, debes crear un snippet.Routes.ts y funciona como el lazy loading trandicional
  {path: 'create-snippet', loadComponent: () => import('./features/snippets/components/create-snippet/create-snippet').then((m) => m.CreateSnippet)},
];
