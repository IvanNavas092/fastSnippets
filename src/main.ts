import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { firebaseConfig } from './environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
})
  .catch((err) => console.error(err));
