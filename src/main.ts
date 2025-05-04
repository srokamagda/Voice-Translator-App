import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { IonicModule } from '@ionic/angular';
import { provideHttpClient, HttpClient } from '@angular/common/http';

import { environment } from './environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideServiceWorker } from '@angular/service-worker';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      // Import BrowserModule to add browser-specific providers
      BrowserModule,
      IonicModule.forRoot(),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        }
      })
    ),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    SpeechRecognition,
    provideServiceWorker('ngsw-config.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
});
