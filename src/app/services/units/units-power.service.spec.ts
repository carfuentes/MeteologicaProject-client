import { TestBed } from '@angular/core/testing';

import { UnitsPowerService } from './units-power.service';

describe('UnitsPowerService', () => {
  let service: UnitsPowerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitsPowerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
