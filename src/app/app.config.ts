import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'; 

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { environment } from '@/environments/environment';

// lottie
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    provideFirebaseApp(() => initializeApp(environment)), 
    provideAuth(() => getAuth()), 

    // lottie
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
  ],
};
