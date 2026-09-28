// app.component.ts:

import { Component } from '@angular/core';
import { CharactersList } from './Components/characters-list/characters-list';

@Component({
  imports: [CharactersList],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
