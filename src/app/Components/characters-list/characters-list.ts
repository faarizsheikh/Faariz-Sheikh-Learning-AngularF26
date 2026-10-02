// characters-list.ts:

import { Component } from '@angular/core';
import { CharactersCard } from '../characters-card/characters-card';
import { statEvent } from '../../Shared/Models/events-data';

@Component({
  imports: [CharactersCard],
  selector: 'app-characters-list',
  styleUrl: './characters-list.scss',
  templateUrl: './characters-list.html',
})
export class CharactersList {
  // Function to console a message upon toggle:
  handleStat(event: statEvent): void {
    console.log(
      `Character ${event.id}:
        Status updated to ${event.newStat} from ${event.oldStat}.`,
    );
  }
}
