import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_CONFIG } from './Shared/Config/app-config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: APP_CONFIG, // Identifies token.
      useValue: {
        // Tells Angular to provide this exact configuration object.
        apiBaseUrl: 'https://placeholder.example.com/api',
        defaultCategory: 'all',
      },
    },
  ],
};
