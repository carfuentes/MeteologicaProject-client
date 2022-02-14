import { Injectable } from '@angular/core';
import { ChartService } from './chart.service';

/** Service that extends the functionality of the abstract class to build ECharts data charts
 * with the specific configuration options for a Energy chart */
@Injectable({
  providedIn: 'root'
})
export class EnergyChartService extends ChartService {

  yAxisName = "Energy";
  minyAxis = 0;
  lineColor = '#59ba52';
  

  constructor() {
    super()
   }
}
