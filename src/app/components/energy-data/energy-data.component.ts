import { Component, OnInit } from '@angular/core';

import { DataParentComponent } from '../data-parent/data-parent.component';

import { EnergyChartService } from '../../services/charts/energy-chart.service';
import { ProcessEnergyDataService } from '../../services/process-data/process-energy-data.service';

import { SocketService } from '../../services/socket/socket.service';

/**Component that displays a chart with the energy from power data during a time period, taking into account
 * the current date.
 * It extends an abstract class that has all the common functionality implemented to process the data being received and
 * visualize it into a chart.
 */
@Component({
  selector: 'app-energy-data-chart',
  templateUrl: '../data-parent/data-parent.component.html',
  styleUrls: ['../data-parent/data-parent.component.css']
})
export class EnergyDataComponent extends DataParentComponent {

  eventName;
  selectedDataUnit;
  dataUnits;
  chartOptions;

  /** The corresponding services related to the Energy chart build are injected into the component */
  constructor(protected chartService: EnergyChartService, 
              protected processDataService: ProcessEnergyDataService, 
              protected socketService: SocketService ) {
    super()
    // Set the event socket name            
    this.eventName = "power"
    // The corresponding energy and power data possible units
    this.dataUnits=this.processDataService.listUnits
    // The selected data unit for display
    this.selectedDataUnit=this.processDataService.selectedDataUnit;
    this.chartOptions= this.chartService.setChartOptions(this.startDate,
                                            this.endDate,
                                            this.selectedDataUnit);
   }


}
