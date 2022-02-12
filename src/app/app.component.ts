import { Component } from '@angular/core';
import { ProcessEnergyDataService } from './services/process-data/process-energy-data.service';
import { ProcessTemperatureDataService } from './services/process-data/process-temperature-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'MeteologicaProject-client';
  
  tabs : {[key: string]: ProcessEnergyDataService | ProcessTemperatureDataService};

  constructor( public processTemperatureService: ProcessTemperatureDataService, 
              public processEnergyService: ProcessEnergyDataService) {
      
      this.tabs = {
        temperature: this.processTemperatureService,
        power: this.processEnergyService
      }

  }
}
