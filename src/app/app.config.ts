import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"danotes-85f11","appId":"1:604649473181:web:154a686f63be30a5948074","storageBucket":"danotes-85f11.appspot.com","apiKey":"AIzaSyCTzD5qeXKYsxcOPjeKD0e7QqA9UYcuzwQ","authDomain":"danotes-85f11.firebaseapp.com","messagingSenderId":"604649473181"})), provideFirestore(() => getFirestore())]
};
