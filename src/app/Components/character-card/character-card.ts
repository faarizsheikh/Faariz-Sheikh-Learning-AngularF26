// CHARACTER CARD COMPONENT CLASS (character-card.component.ts):

import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Character } from '../../Shared/Models/character-data';
import { removeEvent } from '../../Shared/Models/remove-event-data';
import { RouterLink } from '@angular/router';

@Component({
  imports: [NgOptimizedImage, RouterLink],
  selector: 'app-character-card',
  styleUrl: './character-card.scss',
  templateUrl: './character-card.html',
})
export class CharacterCard {
  character = input.required<Character>();
  removeEvent = output<removeEvent>();

  isFirst = input(false);
  isLast = input(false);

  // Toggle button to emit the requested remove:
  protected removeCharacter(): void {
    const character = this.character();

    // Sending information to the parent component (Characters-List):
    this.removeEvent.emit({
      id: character.id,
      name: character.name,
    });
  }
}
