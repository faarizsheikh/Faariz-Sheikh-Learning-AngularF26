// characters-card.ts:

import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Characters } from '../../Shared/Models/characters-data';
import { statEvent } from '../../Shared/Models/events-data';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-characters-card',
  styleUrl: './characters-card.scss',
  templateUrl: './characters-card.html',
})
export class CharactersCard {
  character = input.required<Characters>();
  statEvent = output<statEvent>();

  // Toggle button to switch between status:
  protected toggleStat(): void {
    const character = this.character();

    // Storing old status as a string based on boolean value:
    const oldStat =
      character.status === undefined ? 'unknown' : character.status ? 'alive' : 'dead';

    // Setting a new status based on old status:
    const newStat = oldStat === 'unknown' ? 'alive' : oldStat === 'alive' ? 'dead' : 'unknown';

    // Updating property's value by converting back to boolean:
    character.status = newStat === 'alive' ? true : newStat === 'dead' ? false : undefined;

    // Sending information to the parent component (Characters-List):
    this.statEvent.emit({
      id: character.id,
      newStat,
      oldStat,
    });
  }
}
