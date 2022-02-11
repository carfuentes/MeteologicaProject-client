import { Injectable } from '@angular/core';
import { UnitsParentService } from './units-parent.service';

@Injectable({
  providedIn: 'root'
})
export class UnitsPowerService extends UnitsParentService {

  listUnits = ["MW"];
  conversionTable = {
      "MW-MW": (value: number) => {
        return value;
      }
    };
  

  constructor() {
    super()
  }
  
}
