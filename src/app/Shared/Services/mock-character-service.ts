// MOCK CHARACTERS SERVICE (mock-character-service.ts):

import { Injectable, computed, signal } from '@angular/core';
import { Character } from '../Models/character-data';

@Injectable({
  providedIn: 'root',
})
export class MockCharacterService {
  private characters = signal<Character[]>([
    {
      id: 101,
      name: 'MOCK CHARACTER ONE',
      quote: 'I want to learn the ways of Angular and become a pro like my father.',
      age: 100,
      gender: 'Male',
      status: true,
      played_by: 'Mock Actor',
      character_type: 'Mocking Protagonist',
      description: 'The main character of the mock data.',
      imageLink: '../../Assets/mock-character-images/mock-character-one.png',
    },
    {
      id: 102,
      name: 'MOCK CHARACTER TWO',
      quote: 'Mock Character One. I am your father!',
      age: 200,
      gender: 'Male',
      status: false,
      played_by: 'Mock Actor',
      character_type: 'Mocking Antagonist',
      description: 'The enemy of peace; causer of destruction.',
      imageLink: '../../Assets/mock-character-images/mock-character-two.png',
    },
  ]);

  readonly apiBaseUrl = 'MOCK DATA';
  readonly charactersList = this.characters.asReadonly();

  readonly aliveCharacters = computed(() =>
    this.characters().filter((character) => character.status === true),
  );

  readonly aliveCharacterCount = computed(() => this.aliveCharacters().length);

  addCharacter(character: Character): void {
    this.characters.update((list) => [...list, character]);
  }

  removeCharacter(id: number): void {
    this.characters.update((list) => list.filter((character) => character.id !== id));
  }

  toggleStat(id: number, status: boolean | undefined): void {
    this.characters.update((list) => {
      const index = list.findIndex((character) => character.id === id);

      if (index === -1) return list;

      const updated = [...list];

      updated[index] = {
        ...updated[index],
        status,
      };
      return updated;
    });
  }
}
