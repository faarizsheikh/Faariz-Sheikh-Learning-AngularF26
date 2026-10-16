// MOCK CHARACTERS SERVICE UNIT TESTS (mock-characters-service.spec.ts):

import { TestBed } from '@angular/core/testing';
import { MockCharactersService } from './mock-characters-service';

describe('MockCharactersService', () => {
  let service: MockCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockCharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
