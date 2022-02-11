import { Injectable } from '@angular/core';
import { UnitsParentService } from './units-parent.service';

@Injectable({
  providedIn: 'root'
})
export class UnitsTemperatureService extends UnitsParentService {

  listUnits = ["ºC","dK"];
  conversionTable = {
      "dK-ºC": (value: number) => {
        return Math.round(((value / 10) - 273)*100)/100; 
      },
       "ºC-dK": (value: number) => {
        return Math.round((value + 273 * 10)*100)/100; 
       },
      "dK-dK": (value: number) => {
        return value;
      },
      "ºC-ºC": (value: number) => {
        return value;
      }
    };

  constructor() { 
    super();
  }
  
}
