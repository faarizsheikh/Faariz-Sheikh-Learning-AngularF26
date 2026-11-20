// MOCK CHARACTERS SERVICE (mock-character-service.ts):

import { Injectable, signal, effect } from '@angular/core';
import { Character } from '../Models/character-data';

@Injectable({
  providedIn: 'root',
})
export class MockCharacterService {
  private characters = signal<Character[]>([
    {
      id: '101',
      firstName: 'MOCK',
      alias: 'CHARACTER',
      lastName: 'ONE',
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
      id: '102',
      firstName: 'MOCK',
      alias: 'CHARACTER',
      lastName: 'TWO',
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

  constructor() {
    effect(() => {
      console.log(`Character count: ${this.characters().length}`);
    });
  }
}
