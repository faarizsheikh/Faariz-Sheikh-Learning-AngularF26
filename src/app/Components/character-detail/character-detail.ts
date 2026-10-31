/* -- CHARACTER DETAIL COMPONENT CLASS (character-detail.component.ts): -- */

import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { CharacterService } from '../../Shared/Services/character-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [NgOptimizedImage, RouterLink],
  selector: 'app-character-detail',
  styleUrl: './character-detail.scss',
  templateUrl: './character-detail.html',
})
export class CharacterDetail {
  id = input.required<string>(); // Receives the route parameter.
  private characterService = inject(CharacterService);

  // Find the matching character; recalculate if id changes:
  character = computed(() =>
    this.characterService.charactersList().find((c) => c.id === Number(this.id())),
  );

  protected toggleStat(): void {
    const character = this.character();

    if (!character) return;

    const newStatus = character.status === undefined ? true : character.status ? false : undefined;
    this.characterService.toggleStat(character.id, newStatus);
  }
}
