import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp } from "firebase/app";
import { provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const environment = {
  production: false,
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyAQv0rjfVxYMQKNuhtGqDHuFcw96nlOjM8",
      authDomain: "covoiturage-83b6f.firebaseapp.com",
      projectId: "covoiturage-83b6f",
      storageBucket: "covoiturage-83b6f.appspot.com",
      messagingSenderId: "163152978226",
      appId: "1:163152978226:web:4391e36ee4f9ff633eb72b"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};

