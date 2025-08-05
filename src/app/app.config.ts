import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

// *** Importaciones clave de Firebase ***
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'; // <--- ¡Esta es la importante para 'Auth'!
// ****************************************

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { environment } from '@/environments/environment';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // *** Aquí es donde se "proveen" los servicios de Firebase ***
    provideFirebaseApp(() => initializeApp(environment)), // Inicializa tu app Firebase
    provideAuth(() => getAuth()), // <--- ¡Este es el que provee el servicio Auth!
    // *************************************************************
  ],
};
