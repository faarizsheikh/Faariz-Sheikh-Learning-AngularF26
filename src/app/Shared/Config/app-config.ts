// APPLICATION CONFIG INTERFACE (app-config.ts):

import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiBaseUrl: string;
  defaultCategory: string;
  tmdbApiKey: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
