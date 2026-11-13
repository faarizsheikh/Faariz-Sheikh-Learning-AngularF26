// APPLICATION DI PROVIDERS (app.config.ts):

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './Shared/Config/app-config';
import { errorInterceptor } from './Shared/Interceptors/error-interceptor';
import { loadingInterceptor } from './Shared/Interceptors/loading-interceptor';
import { CharacterService } from './Shared/Services/character-service';
// import { MockCharacterService } from './Shared/Services/mock-character-service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    // Register HTTP interceptors:
    provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor])),
    {
      provide: APP_CONFIG,
      useValue: {
        apiBaseUrl: 'https://api.themoviedb.org/3',
        defaultCategory: 'all',
        tmdbApiKey: '5174de27c5d37e3aa7ba68df70ffc19c',
      } satisfies AppConfig,
    },
    {
      provide: CharacterService,
      // Real service:
      useClass: CharacterService,
      // To switch to mock data instead:
      // useClass: MockCharacterService,
    },
  ],
};
