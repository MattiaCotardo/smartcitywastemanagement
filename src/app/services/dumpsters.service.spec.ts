import { TestBed } from '@angular/core/testing';

import { DumpstersService } from './dumpsters.service';

describe('DumpstersService', () => {
  let service: DumpstersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DumpstersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
