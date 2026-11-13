// APPLICATION DI PROVIDERS (app.config.ts):

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { APP_CONFIG, AppConfig } from './Shared/Config/app-config';
import { CharacterService } from './Shared/Services/character-service';
// import { MockCharacterService } from './Shared/Services/mock-character-service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
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

      // Removing this will switch back to real data:
      // useClass: MockCharacterService,
    },
  ],
};
