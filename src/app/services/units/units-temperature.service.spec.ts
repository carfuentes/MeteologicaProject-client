import { TestBed } from '@angular/core/testing';

import { UnitsTemperatureService } from './units-temperature.service';

describe('UnitsTemperatureService', () => {
  let service: UnitsTemperatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitsTemperatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
