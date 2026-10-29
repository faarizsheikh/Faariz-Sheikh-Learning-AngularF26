// CHARACTER CARD COMPONENT CLASS (character-card.component.ts):

import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Character } from '../../Shared/Models/character-data';
import { removeEvent } from '../../Shared/Models/remove-event-data';
import { statEvent } from '../../Shared/Models/status-event-data';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-character-card',
  styleUrl: './character-card.scss',
  templateUrl: './character-card.html',
})
export class CharacterCard {
  character = input.required<Character>();
  removeEvent = output<removeEvent>();
  statEvent = output<statEvent>();

  // Toggle button to emit the requested remove:
  protected removeCharacter(): void {
    const character = this.character();

    // Sending information to the parent component (Characters-List):
    this.removeEvent.emit({
      id: character.id,
      name: character.name,
    });
  }

  // Toggle button to emit the status change:
  protected toggleStat(): void {
    const character = this.character();

    // Storing old status as a string based on boolean value:
    const oldStat =
      character.status === undefined ? 'Unknown' : character.status ? 'Alive' : 'Dead';

    // Storing new status as a string based on old status:
    const newStat = oldStat === 'Unknown' ? 'Alive' : oldStat === 'Alive' ? 'Dead' : 'Unknown';

    // Sending information to the parent component (Characters-List):
    this.statEvent.emit({
      id: character.id,
      oldStat,
      newStat,
    });
  }
}
