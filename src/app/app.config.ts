// APPLICATION DI PROVIDERS (app.config.ts):

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_CONFIG } from './Shared/Config/app-config';
import { CharactersService } from './Shared/Services/characters-service';
import { MockCharactersService } from './Shared/Services/mock-characters-service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: APP_CONFIG, // Identifies token.
      useValue: {
        // Tells Angular to provide this exact configuration object:
        apiBaseUrl: 'https://placeholder.example.com/api',
        defaultCategory: 'all',
      },
    },
    {
      provide: CharactersService,
      useClass: MockCharactersService, // Removing this will switch back to real data.
    },
  ],
};
