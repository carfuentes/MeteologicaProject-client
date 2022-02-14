import { TestBed } from '@angular/core/testing';

import { EnergyChartService } from './energy-chart.service';

describe('EnergyChartService', () => {
  let service: EnergyChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergyChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
