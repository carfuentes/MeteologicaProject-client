import { Injectable } from '@angular/core';
import { DataPoint } from 'src/app/interfaces/data-point';
import { DataPointToPlot } from 'src/app/interfaces/data-point-to-plot';
import { BasicDataPoint } from 'src/app/interfaces/basic-data-point';
import { ProcessDataService } from './process-data.service'


/** Service that inherits from an abstract class the basic methods to process power data records 
 *  received in an time interval and has the specifcs to transform it to an energy value.
 *  It has also the the power and energy different units and their conversions.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class ProcessEnergyDataService extends ProcessDataService {

  listUnits = {"kWh":"kW","MWh":"MW"};

  selectedDataUnit ="kW";
  conversionTable = {
      "MW-kW": (value: number) => {
        return value * 1000;
      },
      "kW-MW": (value: number ) => {
        return this.roundValue(value / 1000)
      }
    };

  constructor() { 
    super()
  }

  /** Function to get the corresponding energy value from the power data record and the time point corresponding with
   * that measure
   * @param dataPoint: Object representing a power data record
   * @param newDataPointToPlot: Object representing the energy data point to be plotted
   */
  getFinalValue(dataPoint: BasicDataPoint, newDataPointToPlot: DataPointToPlot): DataPointToPlot {
    newDataPointToPlot.value=this.roundValue(dataPoint.value * (this.seconds/3600))
    newDataPointToPlot.unit=dataPoint.unit+"h";
    return newDataPointToPlot
  }

}
