import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { FormLoginRegisterComponent } from './features/auth/form-login-register';
import { Snippets } from './features/snippets/snippets';
import { FavSnippets } from './features/fav-snippets/fav-snippets';
import { guardLoginGuard } from './core/auth/guard-login-guard';
import { IaAgent } from './features/ia-agent/ia-agent';
import { CreateSnippet } from './features/create-snippet/create-snippet';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: FormLoginRegisterComponent },
  { path: 'snippets', component: Snippets },
    {
    path: 'create-snippet',
    component: CreateSnippet,
    canActivate: [guardLoginGuard],
  },
  {
    path: 'fav-snippets',
    component: FavSnippets,
    canActivate: [guardLoginGuard],
  },
    {
    path: 'ia-agent',
    component: IaAgent,
    canActivate: [guardLoginGuard],
  },
];
