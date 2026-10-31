// GLOBAL ROUTING CONFIGURATION (app.routes.ts):

import { Routes } from '@angular/router';
import { CharacterList } from './Components/character-list/character-list';
import { CharacterDetail } from './Components/character-detail/character-detail';
import { PageNotFound } from './Components/page-not-found/page-not-found';

export const routes: Routes = [
  { path: '', redirectTo: '/characters', pathMatch: 'full' },

  { path: 'characters', component: CharacterList },
  { path: 'characters/:id/view', component: CharacterDetail },

  { path: 'char', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'chars', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'character', redirectTo: '/characters', pathMatch: 'full' },

  { path: 'char/:id', redirectTo: '/characters/:id/view', pathMatch: 'full' },
  { path: 'chars/:id', redirectTo: '/characters/:id/view', pathMatch: 'full' },
  { path: 'character/:id', redirectTo: '/characters/:id/view', pathMatch: 'full' },
  { path: 'characters/:id', redirectTo: '/characters/:id/view', pathMatch: 'full' },

  { path: 'char/:id/view', redirectTo: '/characters/:id/view', pathMatch: 'full' },
  { path: 'chars/:id/view', redirectTo: '/characters/:id/view', pathMatch: 'full' },
  { path: 'character/:id/view', redirectTo: '/characters/:id/view', pathMatch: 'full' },

  { path: '**', component: PageNotFound },
];
