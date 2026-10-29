// ROOT COMPONENT DEFINITION (app.ts):

import { Component } from '@angular/core';
import { CharacterList } from './Components/character-list/character-list';

@Component({
  imports: [CharacterList],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
