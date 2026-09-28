// characters-card.ts:

import { Component, input } from '@angular/core';
import { Characters } from '../../Shared/Models/my-data';

@Component({
  imports: [],
  selector: 'app-characters-card',
  styleUrl: './characters-card.scss',
  templateUrl: './characters-card.html',
})
export class CharactersCard {
  character = input.required<Characters>();
}
