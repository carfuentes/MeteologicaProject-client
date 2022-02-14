import { Injectable } from '@angular/core';
import { ChartService } from './chart.service';

/** Service that extends the functionality of the abstract class to build ECharts data charts
 * with the specific configuration options for a Temperature chart */
@Injectable({
  providedIn: 'root'
})
export class TemperatureChartService extends ChartService {
  
  yAxisName = "Temperature";
  minyAxis = function(value: {[key: string]: number}): number {
    return value['min'] - 0.5;
  };
  lineColor = 'orange';

  constructor() { 
    super()
  }
}
