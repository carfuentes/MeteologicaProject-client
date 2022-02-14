import { TestBed } from '@angular/core/testing';

import { TemperatureChartService } from './temperature-chart.service';

describe('TemperatureChartService', () => {
  let service: TemperatureChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemperatureChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
