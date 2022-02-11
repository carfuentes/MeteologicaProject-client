import { Injectable } from '@angular/core';
import { DataPoint } from 'src/app/interfaces/data-point';

@Injectable({
  providedIn: 'root'
})
export abstract class UnitsParentService {

  abstract listUnits: string[];
  abstract conversionTable: { [key: string]: Function};

  constructor() { }

  convertDataValue(dataItem: DataPoint, selectedUnit: string): number {
    let conversion: string = `${dataItem.unit}-${selectedUnit}`;
    console.log(conversion)
    console.log(this.conversionTable)
    return this.conversionTable[conversion](dataItem.value);

  }
}
