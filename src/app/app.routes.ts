import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { FormLoginRegisterComponent } from './features/auth/form-login-register';
import { Snippets } from './features/snippets/snippets';
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: FormLoginRegisterComponent },
  { path: 'snippets', component: Snippets },
];
