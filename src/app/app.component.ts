import { Component } from '@angular/core';
import { UnitsPowerService } from './services/units/units-power.service';
import { UnitsTemperatureService } from './services/units/units-temperature.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'MeteologicaProject-client';
  // temperature="temperature";
  // power="power";

  tabs : {[key: string]: UnitsTemperatureService | UnitsPowerService};

  constructor( public unitsPowerService: UnitsPowerService, 
              public unitsTemperatureService: UnitsTemperatureService) {
      
      this.tabs = {
        temperature: this.unitsTemperatureService,
        power: this.unitsPowerService
      }

  }
}
