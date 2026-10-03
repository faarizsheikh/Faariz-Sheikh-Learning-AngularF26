// characters-list.ts:

import { Component, inject } from '@angular/core';
import { CharactersCard } from '../characters-card/characters-card';
import { statEvent } from '../../Shared/Models/status-event-data';
import { CharactersService } from '../../Shared/Services/characters-service';
import { removeEventData } from '../../Shared/Models/remove-event-data';

@Component({
  imports: [CharactersCard],
  selector: 'app-characters-list',
  styleUrl: './characters-list.scss',
  templateUrl: './characters-list.html',
})
export class CharactersList {
  private charactersService = inject(CharactersService);
  aliveCharacters = this.charactersService.aliveCharacters;
  aliveCharacterCount = this.charactersService.aliveCharacterCount;
  characters = this.charactersService.charactersList;

  // Function to remove an item in the list and console a message about it:
  handleRemove(event: removeEventData): void {
    this.charactersService.removeCharacter(event.id);

    console.log(
      `Character ${event.id}:
      ${event.name} has been removed.`,
    );
  }

  // Function to console a message upon toggle:
  handleStat(event: statEvent): void {
    // Updating property's value by converting back to boolean:
    const newStatus =
      event.newStat === 'alive' ? true : event.newStat === 'dead' ? false : undefined;

    this.charactersService.toggleStat(event.id, newStatus);

    console.log(
      `Character ${event.id}:
        Status updated to ${event.newStat} from ${event.oldStat}.`,
    );
  }
}
