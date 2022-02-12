import { TestBed } from '@angular/core/testing';

import { ProcessEnergyDataService } from './process-energy-data.service';

describe('ProcessEnergyDataService', () => {
  let service: ProcessEnergyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessEnergyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
