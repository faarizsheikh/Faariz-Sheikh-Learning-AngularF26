// CHARACTER STATUS PIPE UNIT TESTS (character-status-pipe.spec.ts):

import { CharacterStatusPipe } from './character-status-pipe';

describe('CharacterStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new CharacterStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
