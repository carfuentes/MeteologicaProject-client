import { TestBed } from '@angular/core/testing';

import { UnitsParentService } from './units-parent.service';

describe('UnitsParentService', () => {
  let service: UnitsParentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitsParentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
