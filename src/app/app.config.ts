import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { headersInterceptor } from './core/interceptor/headers/headers.interceptor';
import { errorsInterceptor } from './core/interceptor/errors/errors.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptor/loading/loading.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './core/utils/httpFiles';





export const appConfig: ApplicationConfig = {
  providers:
  [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()   ,   withInterceptors([headersInterceptor , errorsInterceptor , loadingInterceptor])),
    provideAnimations(),
    provideAnimationsAsync(),
    providePrimeNG({theme: { preset: Aura}}),
    provideToastr(), 
    importProvidersFrom(NgxSpinnerModule , TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }))
  ]
};
