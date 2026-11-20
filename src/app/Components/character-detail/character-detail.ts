/* -- CHARACTER DETAIL COMPONENT CLASS (character-detail.component.ts): -- */

import { DecimalPipe, NgOptimizedImage, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterStatusPipe } from '../../Shared/Pipes/character-status-pipe';
import { TruncatePipe } from '../../Shared/Pipes/truncate-pipe';
import { CharacterService } from '../../Shared/Services/character-service';

@Component({
  imports: [
    NgOptimizedImage,
    RouterLink,
    TitleCasePipe,
    DecimalPipe,
    CharacterStatusPipe,
    TruncatePipe,
    UpperCasePipe,
  ],
  selector: 'app-character-detail',
  styleUrl: './character-detail.scss',
  templateUrl: './character-detail.html',
})
export class CharacterDetail {
  id = input.required<string>(); // Receives the route parameter.
  private characterService = inject(CharacterService);

  isLoading = this.characterService.isLoading;
  error = this.characterService.error;

  // Find the matching character; recalculate if id changes:
  character = computed(() =>
    this.characterService.charactersList().find((c) => c.id === this.id()),
  );

  // Change the character status:
  protected toggleStat(): void {
    const character = this.character();

    if (!character) return;

    const newStatus = character.status === undefined ? true : character.status ? false : undefined;
    this.characterService.toggleStat(character.id, newStatus);
  }
}
