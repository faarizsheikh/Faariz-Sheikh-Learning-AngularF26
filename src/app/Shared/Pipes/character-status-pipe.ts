// CHARACTER STATUS PIPE (character-status-pipe.ts):

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterStatus',
})
export class CharacterStatusPipe implements PipeTransform {
  transform(value: unknown): string {
    if (value === true) return 'Alive';
    if (value === false) return 'Dead';

    return 'Unknown';
  }
}
