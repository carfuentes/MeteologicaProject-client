import { Injectable } from '@angular/core';
import { DataPoint } from 'src/app/interfaces/data-point';
import { DataPointToPlot } from 'src/app/interfaces/data-point-to-plot';
import { ProcessDataService } from './process-data.service'

@Injectable({
  providedIn: 'root'
})
export class ProcessEnergyDataService extends ProcessDataService {

  listUnits = ["kW","MW"];
  conversionTable = {
      "MW-MW": (value: number) => {
        return value;
      },
      "MW-kW": (value: number) => {
        return value * 1000;
      }
    };

  constructor() { 
    super()
  }

  getFinalValue(dataPoint: DataPoint, newDataPointToPlot: DataPointToPlot): DataPointToPlot {
    newDataPointToPlot.value=this.roundValue(dataPoint.value * (this.seconds/3600))
    newDataPointToPlot.unit=dataPoint.unit+"h";
    return newDataPointToPlot
  }

}
