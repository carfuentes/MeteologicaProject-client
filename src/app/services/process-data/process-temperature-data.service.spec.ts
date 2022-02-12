import { TestBed } from '@angular/core/testing';

import { ProcessTemperatureDataService } from './process-temperature-data.service';

describe('ProcessTemperatureDataService', () => {
  let service: ProcessTemperatureDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessTemperatureDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
