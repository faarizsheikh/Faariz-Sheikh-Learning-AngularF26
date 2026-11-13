// CHARACTER SERVICE (character-service.ts):

import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { APP_CONFIG } from '../Config/app-config';
import { mapTMDBCreditsResponse } from '../Mappers/tmdb-character-mapper';
import type { Character } from '../Models/character-data';
import type { TMDBCreditsResponse } from '../Models/tmdb-credits-data';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  // Dependency Injection:
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  // API base URL:
  readonly apiBaseUrl = this.config.apiBaseUrl;

  // Existing writable signal:
  private characters = signal<Character[]>([
    {
      id: '1',
      firstName: 'Billy',
      nickName: 'Bill',
      lastName: 'Denbrough',
      quote:
        'I go home and all I see is that ' +
        "Georgie isn't there. " +
        'His clothes, his toys, ' +
        "his stupid stuffed animals... but he isn't.",
      age: 13,
      gender: 'Male',
      status: true,
      played_by: 'Jaeden Lieberher (Jaeden Martell)',
      character_type: 'Protagonist',
      description:
        'William Billy Denbrough is the brave, ' +
        "stuttering leader of the Losers' Club in IT (2017). " +
        "Driven by the survivor's guilt, " +
        'he seeks revenge on Pennywise, ' +
        'The Dancing Clown for killing his little brother, George.',
      imageLink: '../../Assets/character-images/bill-den.png',
    },
    {
      id: '2',
      firstName: 'George',
      nickName: 'Georgie',
      lastName: 'Denbrough',
      quote: '(Referring to the boat) She?... She. Thanks, Billy.',
      age: 6,
      gender: 'Male',
      status: false,
      played_by: 'Jackson Robert Scott',
      character_type: 'Catalyst',
      description:
        'George Elmer Denbrough was a sweet, young boy, ' +
        'whose death caused deep trauma and survivor’s guilt for Bill, ' +
        "driving the Losers' Club to hunt the evil entity.",
      imageLink: '../../Assets/character-images/george-den.png',
    },
    {
      id: '3',
      firstName: 'Deadlights',
      nickName: 'IT',
      lastName: 'Pennywise',
      quote:
        "No! 'll take him! I'll take all of you! " +
        "I'll feast on your flesh as I feed on your fear..." +
        "Or...you'll just leave us be..." +
        'I will take him. Only him, and I will have my long rest ' +
        'and you will all live to ' +
        'grow and thrive and lead *happy* lives, ' +
        'until old age takes you back to the weeds.',
      age: undefined,
      gender: 'Unknown',
      status: undefined,
      played_by: 'Bill Skarsgård',
      character_type: 'Antagonist',
      description:
        'An ancient, shape-shifting cosmic entity that ' +
        'preys on the fears of children in ' +
        'Derry, Maine, every 27 years. ' +
        'He is responsible for the death of George Elmer Denbrough.',
      imageLink: '../../Assets/character-images/pw-clown.png',
    },
    {
      id: '4',
      firstName: 'Rich',
      nickName: 'Richie',
      lastName: 'Tozier',
      quote:
        '(Censored version:) I told you, Bill. I fricking told you. ' +
        "I don't wanna die. It's your fault. " +
        'You punched me in the face, ' +
        'you made me walk through crappy water, ' +
        'you dragged me into a damn crackhead house! ' +
        "And now...I'm gonna have to kill this fricking clown.",
      age: 13,
      gender: 'Male',
      status: true,
      played_by: 'Finn Wolfhard',
      character_type: 'Co-Protagonist',
      description:
        'Rich Tozier is the fast-talking, ' +
        "wisecracking comic relief of the Losers' Club. " +
        'Due to his non-stop jokes, sarcasm, and impressions ' +
        'to deal with fear and trauma, ' +
        'He is nicknamed as “Trashmouth.”',
      imageLink: '../../Assets/character-images/rich-toz.png',
    },
    {
      id: '5',
      firstName: 'Stanley',
      nickName: 'Stan',
      lastName: 'Uris',
      quote: 'No! No next time, Bill!',
      age: 13,
      gender: 'Male',
      status: true,
      played_by: 'Wyatt Oleff',
      character_type: 'Supporting Character',
      description:
        'Stanley Uris is a cautious, methodical ' +
        "member of the Losers' Club who is the son of a local rabbi. " +
        'He is the most logical thinker in the group.',
      imageLink: '../../Assets/character-images/stan-ur.png',
    },
    {
      id: '6',
      firstName: 'Eddie',
      nickName: 'Edds',
      lastName: 'Kaspbrak',
      quote: '[To Richie Tozier] -puffs- Have you ever ' + 'heard of a staph infection?',
      age: 13,
      gender: 'Male',
      status: true,
      played_by: 'Jack Dylan Grazer',
      character_type: 'Supporting Character',
      description:
        'Eddie Kaspbrak is the shortest, ' +
        'most fragile, and hyper-anxious ' +
        "member of the Losers' Club. " +
        'He is dominated by his fiercely ' +
        'overprotective mother, Sonia, ' +
        'who convinces him he is sickly and asthmatic.',
      imageLink: '../../Assets/character-images/eds-k.png',
    },
    {
      id: '7',
      firstName: 'Beverly',
      nickName: 'Bev',
      lastName: 'Marsh',
      quote:
        '[To the Losers] This is what it wants. ' +
        'It wants to divide us. ' +
        'We were all together when we hurt it. ' +
        "That's why we're still alive!",
      age: 13,
      gender: 'Female',
      status: true,
      played_by: 'Sophia Lillis',
      character_type: 'Co-Protagonist',
      description:
        'Beverly Marsh is the lone female ' +
        "member of the Losers' Club, " +
        'who is a brave, resilient, and fiercely ' +
        'independent adolescent. She carries heavy emotional ' +
        'pain from severe bullying at school ' +
        'and abuse at home by her father, Alvin Marsh.',
      imageLink: '../../Assets/character-images/bev-marsh.png',
    },
    {
      id: '8',
      firstName: 'Michael',
      nickName: 'Mike',
      lastName: 'Hanlon',
      quote:
        'My grandfather thinks this town is cursed. ' +
        'He says that all the bad things ' +
        'that happened in this town are because of one thing. ' +
        'An evil thing that feeds off the people of Derry.',
      age: 13,
      gender: 'Male',
      status: true,
      played_by: 'Chosen Jacobs',
      character_type: 'Supporting Character',
      description:
        'Michael Hanlon is a resilient, isolated ' +
        'African-American teenager ' +
        "who becomes the final core member of the Losers' Club.",
      imageLink: '../../Assets/character-images/mike-han.png',
    },
    {
      id: '9',
      firstName: 'Benjamin',
      nickName: 'Ben',
      lastName: 'Hanscom',
      quote:
        "[Shouting after Beverly] Please don't go girl! " +
        "That's the name of another..." +
        '[to himself] New Kids On The Block song.',
      age: 13,
      gender: 'Male',
      status: true,
      played_by: 'Jeremy Ray Taylor',
      character_type: 'Supporting Character',
      description:
        'Benjamin Hanscom is a new kid ' +
        'who is overweight, soft-spoken, and deeply intelligent. ' +
        'He may be shy but he is also a bookworm.',
      imageLink: '../../Assets/character-images/ben-hc.png',
    },
  ]);

  // Loading and error signals:
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    // Effect reacts to the character count change:
    effect(() => {
      console.log(`Character count: ${this.characters().length}`);
    });

    // Load characters from TMDB:
    this.loadCharacters();
  }

  // Load characters from the API:
  loadCharacters(): void {
    this.isLoading.set(true);
    this.error.set(null);

    // Sends a GET request to the config Api Base URL:
    this.http
      .get<TMDBCreditsResponse>(`${this.config.apiBaseUrl}/movie/346364/credits`, {
        params: {
          api_key: this.config.tmdbApiKey,
        },
      })
      .pipe(
        // Convert the API response into our Character array, sorting them all by billing order.
        map((response) => mapTMDBCreditsResponse(response)),
      )
      .subscribe({
        next: (characters) => {
          this.characters.set(characters);
          this.isLoading.set(false);
        },

        error: (err: unknown) => {
          console.error('TMDB request failed:', err);

          this.error.set('Could not load characters. Please check your connection and try again.');

          this.isLoading.set(false);
        },
      });
  }

  // Read-only version of the character array:
  readonly charactersList = this.characters.asReadonly();

  // Filter only alive characters:
  readonly aliveCharacters = computed(() =>
    this.characters().filter((character) => character.status === true),
  );

  // Count alive characters:
  readonly aliveCharacterCount = computed(() => this.aliveCharacters().length);

  // Retrieve a character:
  getCharacter(id: string): Character | undefined {
    return this.getById(id);
  }

  getById(id: string): Character | undefined {
    return this.characters().find((character) => character.id === id);
  }

  // Add a character:
  addCharacter(character: Character): void {
    this.characters.update((list) => [...list, character]);
  }

  // Update a character:
  updateCharacter(updated: Character): void {
    this.characters.update((list) =>
      list.map((character) => (character.id === updated.id ? updated : character)),
    );
  }

  // Remove a character:
  removeCharacter(id: string): void {
    this.characters.update((list) => list.filter((character) => character.id !== id));
  }

  // Toggle character status:
  toggleStat(id: string, status: boolean | undefined): void {
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
