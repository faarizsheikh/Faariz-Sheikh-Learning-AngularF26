/* -- CHARACTERS LIST COMPONENT CLASS (characters-list.component.ts): -- */

import { Component, inject } from '@angular/core';
import { CharactersCard } from '../characters-card/characters-card';
import { removeEvent } from '../../Shared/Models/remove-event-data';
import { statEvent } from '../../Shared/Models/status-event-data';
import { CharactersService } from '../../Shared/Services/characters-service';

@Component({
  imports: [CharactersCard],
  selector: 'app-characters-list',
  styleUrl: './characters-list.scss',
  templateUrl: './characters-list.html',
})
export class CharactersList {
  private charactersService = inject(CharactersService);
  aliveCharacterCount = this.charactersService.aliveCharacterCount;
  characters = this.charactersService.charactersList;
  dataSource = this.charactersService.apiBaseUrl;

  // Function to remove an item in the list and console a message about it:
  handleRemove(event: removeEvent): void {
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
      event.newStat === 'Alive' ? true : event.newStat === 'Dead' ? false : undefined;

    this.charactersService.toggleStat(event.id, newStatus);

    console.log(
      `Character ${event.id}:
        Status updated to ${event.newStat} from ${event.oldStat}.`,
    );
  }
}
