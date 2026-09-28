// characters-card.ts:

import { Component, input, output } from '@angular/core';
import { Characters, statEvent } from '../../Shared/Models/my-data';

@Component({
  imports: [],
  selector: 'app-characters-card',
  styleUrl: './characters-card.scss',
  templateUrl: './characters-card.html',
})
export class CharactersCard {
  character = input.required<Characters>();
  statEvent = output<statEvent>();

  // Toggle button to switch between status.
  protected toggleStat(): void {
    const character = this.character();

    if (character.status === undefined) {
      character.status = true;

      this.statEvent.emit({
        // Send the value to parent (character-list) to run handleStat()
        id: character.id,
        newStat: 'alive',
      });
    } else if (character.status) {
      character.status = false;

      this.statEvent.emit({
        id: character.id,
        newStat: 'dead',
      });
    } else {
      character.status = undefined;

      this.statEvent.emit({
        id: character.id,
        newStat: 'unknown',
      });
    }
  }
}
