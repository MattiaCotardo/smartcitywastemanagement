import { TestBed } from '@angular/core/testing';

import { AdminsService } from './admins.service';

describe('AdminService', () => {
  let service: AdminsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});