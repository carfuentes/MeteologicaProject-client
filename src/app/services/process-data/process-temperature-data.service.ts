import { Injectable } from '@angular/core';
import { DataPoint } from 'src/app/interfaces/data-point';
import { DataPointToPlot } from 'src/app/interfaces/data-point-to-plot';
import { BasicDataPoint } from 'src/app/interfaces/basic-data-point';
import { ProcessDataService } from './process-data.service'

/** Service that inherits from an abstract class the basic methods to process temperature data records 
 *  received in an time interval and that has the specifcs to transform it to a temperature average value.
 *  It has also the the temperature different units and their conversions.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class ProcessTemperatureDataService extends ProcessDataService{

  listUnits = {"ºC": "ºC","dK":"dK"};
  selectedDataUnit ="ºC"

  conversionTable = {
      "dK-ºC": (value: number) => {
        return this.roundValue((value / 10) - 273)
      },
      "ºC-dK": (value: number) => {
        return this.roundValue((value + 273) * 10) 
       }
   
    };

  constructor() {
    super()
   }

   /** Function to get the corresponding temperature average value, using the cumulative moving average (CMA) formula. 
    * 
   * @param dataPoint: Object representing a temperature data record
   * @param newDataPointToPlot: Object representing the average temperature data point to be plotted
   * 
   * @returns Object with the final data point to be plotted
   */
  getFinalValue(dataPoint: BasicDataPoint, newDataPointToPlot: DataPointToPlot): DataPointToPlot {
    // If there is at least one already plotted average temperature measure, calculate with the last temperature average measure
    // the current average using the new temperature data following the CMA formula
    newDataPointToPlot.value= this.nDataPointsPlotted > 1 ? this.roundValue((this.lastDataPointToPlot.value + (dataPoint.value - this.lastDataPointToPlot.value)/ this.nDataPointsPlotted )) : dataPoint.value;
    newDataPointToPlot.unit=dataPoint.unit;
    return newDataPointToPlot
  }
}
