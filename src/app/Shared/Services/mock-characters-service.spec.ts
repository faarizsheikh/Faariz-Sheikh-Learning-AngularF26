// MOCK CHARACTER SERVICE UNIT TESTS (mock-character-service.spec.ts):

import { TestBed } from '@angular/core/testing';
import { MockCharacterService } from './mock-character-service';

describe('MockCharacterService', () => {
  let service: MockCharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockCharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
