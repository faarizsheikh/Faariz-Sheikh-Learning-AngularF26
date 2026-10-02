// characters-list.ts:

import { Component, inject } from '@angular/core';
import { CharactersCard } from '../characters-card/characters-card';
import { statEvent } from '../../Shared/Models/events-data';
import { CharactersService } from '../../Shared/Services/characters-service';

@Component({
  imports: [CharactersCard],
  selector: 'app-characters-list',
  styleUrl: './characters-list.scss',
  templateUrl: './characters-list.html',
})
export class CharactersList {
  private charactersService = inject(CharactersService);
  characters = this.charactersService.charactersList;

  // Function to console a message upon toggle:
  handleStat(event: statEvent): void {
    console.log(
      `Character ${event.id}:
        Status updated to ${event.newStat} from ${event.oldStat}.`,
    );
  }
}
