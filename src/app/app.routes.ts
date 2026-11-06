// GLOBAL ROUTING CONFIGURATION (app.routes.ts):

import { Routes } from '@angular/router';
import { editGuard } from './Shared/Guards/edit.guard';
import { CharacterDetail } from './Components/character-detail/character-detail';
import { CharacterForm } from './Components/character-form/character-form';
import { CharacterList } from './Components/character-list/character-list';
import { PageNotFound } from './Components/page-not-found/page-not-found';

export const routes: Routes = [
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'characters', component: CharacterList },
  { path: 'characters/add', component: CharacterForm },

  { path: 'characters/:id/view', component: CharacterDetail },
  { path: 'characters/:id/edit', component: CharacterForm, canActivate: [editGuard] },

  { path: 'char', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'chars', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'character', redirectTo: '/characters', pathMatch: 'full' },

  { path: 'char/add', redirectTo: '/characters/add', pathMatch: 'full' },
  { path: 'chars/add', redirectTo: '/characters/add', pathMatch: 'full' },
  { path: 'character/add', redirectTo: '/characters/add', pathMatch: 'full' },

  { path: 'char/new', redirectTo: '/characters/add', pathMatch: 'full' },
  { path: 'chars/new', redirectTo: '/characters/add', pathMatch: 'full' },
  { path: 'character/new', redirectTo: '/characters/add', pathMatch: 'full' },
  { path: 'characters/new', redirectTo: '/characters/add', pathMatch: 'full' },

  { path: 'char/:id', redirectTo: '/characters/:id/view', pathMatch: 'full' },
  { path: 'chars/:id', redirectTo: '/characters/:id/view', pathMatch: 'full' },
  { path: 'character/:id', redirectTo: '/characters/:id/view', pathMatch: 'full' },
  { path: 'characters/:id', redirectTo: '/characters/:id/view', pathMatch: 'full' },

  { path: 'char/:id/view', redirectTo: '/characters/:id/view', pathMatch: 'full' },
  { path: 'chars/:id/view', redirectTo: '/characters/:id/view', pathMatch: 'full' },
  { path: 'character/:id/view', redirectTo: '/characters/:id/view', pathMatch: 'full' },

  { path: 'char/:id/edit', redirectTo: '/characters/:id/edit', pathMatch: 'full' },
  { path: 'chars/:id/edit', redirectTo: '/characters/:id/edit', pathMatch: 'full' },
  { path: 'character/:id/edit', redirectTo: '/characters/:id/edit', pathMatch: 'full' },

  { path: '**', component: PageNotFound },
];
