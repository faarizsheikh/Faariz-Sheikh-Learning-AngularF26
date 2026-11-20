/* -- CHARACTER DETAIL COMPONENT CLASS (character-detail.component.ts): -- */

import { DecimalPipe, NgOptimizedImage, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject, input } from '@angular/core';
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
export class CharacterDetail implements OnInit, OnDestroy {
  id = input.required<string>(); // Receives the route parameter.
  private characterService = inject(CharacterService);

  private openedAt = 0;
  private openedCharName = '';

  // constructor() {
  //   console.log(this.id());
  // }

  isLoading = this.characterService.isLoading;
  error = this.characterService.error;

  // Find the matching character; recalculate if id changes:
  character = computed(() =>
    this.characterService.charactersList().find((c) => c.id === this.id()),
  );

  // Logs when we open the details page of one of the characters:
  ngOnInit(): void {
    const id = this.id();
    const character = this.characterService.getCharacter(id);

    // Store the character's name:
    this.openedCharName = character
      ? `${character.firstName} ${character.lastName}`
      : `Character ${id}`;

    // Record and store the opening timestamp:
    this.openedAt = Date.now();

    // Log the opening message:
    console.log(`[lifecycle] opened: ${this.openedCharName}`);
  }

  // Log when we close the detail page of a character:
  ngOnDestroy(): void {
    // Calculate the spent time on the page in seconds:
    const secondsSpent = Math.round((Date.now() - this.openedAt) / 1000);

    // Log the closing message:
    console.log(`[lifecycle] closed: ${this.openedCharName} after ${secondsSpent} seconds`);
  }

  // Change the character status:
  protected toggleStat(): void {
    const character = this.character();
    if (!character) return;

    const newStatus = character.status === undefined ? true : character.status ? false : undefined;
    this.characterService.toggleStat(character.id, newStatus);
  }
}
