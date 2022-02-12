import { Injectable } from '@angular/core';
import { DataPoint } from 'src/app/interfaces/data-point';
import { DataPointToPlot } from 'src/app/interfaces/data-point-to-plot';
import { ProcessDataService } from './process-data.service'

@Injectable({
  providedIn: 'root'
})
export class ProcessTemperatureDataService extends ProcessDataService{

  listUnits = ["ºC","dK"];
  //rawUnitsToFinal = { "ºC": }
  conversionTable = {
      "dK-ºC": (value: number) => {
        return this.roundValue((value / 10) - 273)
      },
       "ºC-dK": (value: number) => {
        return this.roundValue(value + 273 * 10) 
       },
      "dK-dK": (value: number) => {
        return value;
      },
      "ºC-ºC": (value: number) => {
        return value;
      }
    };

  constructor() {
    super()
   }


  getFinalValue(dataPoint: DataPoint, newDataPointToPlot: DataPointToPlot): DataPointToPlot {
   
    let lastVal= this.lastDataPointToPlot.value ? this.lastDataPointToPlot.value : dataPoint.value;
    newDataPointToPlot.value=this.roundValue((lastVal + dataPoint.value )/2)
    newDataPointToPlot.unit=dataPoint.unit;
    return newDataPointToPlot
  }
}
