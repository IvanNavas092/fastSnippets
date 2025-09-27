import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  getAuth,
  provideAuth,
} from '@angular/fire/auth';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { environment } from '@/environments/environment';

// lottie
import { provideLottieOptions } from 'ngx-lottie';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// highlight
import { provideHighlightOptions } from 'ngx-highlightjs';

// http
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CsrfInterceptor } from './core/interceptors/CsrfInterceptor ';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(
      withInterceptors([CsrfInterceptor])
    ),
    provideRouter(
      routes,
      // scroll
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),
    provideClientHydration(withEventReplay()),

    provideFirebaseApp(() => initializeApp(environment)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // lottie
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),

    // highlight
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml'),
      },
    }),
  ],
};
