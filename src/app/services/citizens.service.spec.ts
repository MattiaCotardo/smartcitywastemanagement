import { TestBed } from '@angular/core/testing';

import { CitizensService } from './citizens.service';

describe('UsersService', () => {
  let service: CitizensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitizensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
