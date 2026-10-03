// characters-card.ts:

import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Characters } from '../../Shared/Models/characters-data';
import { removeEventData } from '../../Shared/Models/remove-event-data';
import { statEvent } from '../../Shared/Models/status-event-data';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-characters-card',
  styleUrl: './characters-card.scss',
  templateUrl: './characters-card.html',
})
export class CharactersCard {
  character = input.required<Characters>();
  removeEvent = output<removeEventData>();
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
      character.status === undefined ? 'unknown' : character.status ? 'alive' : 'dead';

    // Storing new status as a string based on old status:
    const newStat = oldStat === 'unknown' ? 'alive' : oldStat === 'alive' ? 'dead' : 'unknown';

    // Sending information to the parent component (Characters-List):
    this.statEvent.emit({
      id: character.id,
      newStat,
      oldStat,
    });
  }
}
