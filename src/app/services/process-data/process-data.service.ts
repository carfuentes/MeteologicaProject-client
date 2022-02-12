import { Injectable } from '@angular/core';
import { DEFAULT_BREAKPOINTS } from '@angular/flex-layout';
import { DataPoint } from 'src/app/interfaces/data-point'
import { DataPointToPlot } from 'src/app/interfaces/data-point-to-plot'

@Injectable({
  providedIn: 'root'
})
export abstract class ProcessDataService {

  abstract listUnits: string[];
  //abstract rawUnitsToFinal: {[key: string]: string};

  //abstract unitsForPlot: {[key: string]: string};
  abstract conversionTable: { [key: string]: Function};

  seconds :number= 0;

  lastDataPointToPlot : DataPointToPlot = {time: new Date(''), value: 0, unit: ''};
  dataPointConverted: DataPoint;
  

  constructor() { }

  convertDataValue(dataPoint: DataPoint,selectedUnit: string ): DataPoint {
    let conversion: string = `${dataPoint.unit}-${selectedUnit}`;
    console.log(conversion)
    dataPoint.value=this.conversionTable[conversion](dataPoint.value);
    dataPoint.unit=selectedUnit;
    return dataPoint;

  }

  getCurrentDate(timeString: string, startDate: Date): Date {
    let a = timeString.split(':'); // split it at the colons
  
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
    this.seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    
    var oldObj = {
      startDate: startDate
     
    }
    var clonnedObj = JSON.parse(JSON.stringify(oldObj))

    let currentDate= new Date(clonnedObj.startDate);
    currentDate.setSeconds(currentDate.getSeconds() + this.seconds);
    
    return currentDate;
  }

  roundValue(num: number) {
    return Math.round( num * 100 + Number.EPSILON ) / 100;
  }


  abstract getFinalValue(dataPoint: DataPoint, newDataPointToPlot: DataPointToPlot): DataPointToPlot; 

  processDataPoint(dataPoint: DataPoint, startDate: Date, selectedDataUnit: string) {
    let newDataPointToPlot: DataPointToPlot = {time: new Date(''), value: 0, unit: ''}

    this.dataPointConverted = this.convertDataValue(dataPoint,selectedDataUnit)

    newDataPointToPlot.time=this.getCurrentDate(this.dataPointConverted.time,startDate);
    
    newDataPointToPlot=this.getFinalValue(this.dataPointConverted, newDataPointToPlot);

   
   

    this.lastDataPointToPlot = newDataPointToPlot; 
    
    return newDataPointToPlot;

  }
}
