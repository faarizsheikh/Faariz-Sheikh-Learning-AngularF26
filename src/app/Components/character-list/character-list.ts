/* -- CHARACTER LIST COMPONENT CLASS (character-list.component.ts): -- */

import { Component, inject } from '@angular/core';
import { CharacterCard } from '../character-card/character-card';
import { removeEvent } from '../../Shared/Models/remove-event-data';
import { CharacterService } from '../../Shared/Services/character-service';

@Component({
  imports: [CharacterCard],
  selector: 'app-character-list',
  styleUrl: './character-list.scss',
  templateUrl: './character-list.html',
})
export class CharacterList {
  private charactersService = inject(CharacterService);
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
}
