import { HttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection ,importProvidersFrom} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import{routes} from "./app.routes";
import { provideRouter } from '@angular/router';
import { tokenInterceptor } from './core/interceptors/token-interceptor';
import { ReactiveFormsModule } from '@angular/forms';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(withInterceptors([tokenInterceptor])),
        provideRouter(routes),
         importProvidersFrom(ReactiveFormsModule),
         

    
  ]
};
