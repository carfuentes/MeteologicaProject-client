import { Component, OnInit } from '@angular/core';

import { DataParentComponent } from '../data-parent/data-parent.component';

import { SocketService } from '../../services/socket/socket.service';
import { TemperatureChartService } from '../../services/charts/temperature-chart.service';
import { ProcessTemperatureDataService } from '../../services/process-data/process-temperature-data.service';

/**Component that displays a chart with the average temperature during a time period, taking into account
 * the current date.
 * It extends an abstract class that has all the common functionality implemented to process the data being received and
 * visualize it into a chart.
 */
@Component({
  selector: 'app-temperature-data-chart',
  templateUrl: '../data-parent/data-parent.component.html',
  styleUrls: ['../data-parent/data-parent.component.css']
})
export class TemperatureDataComponent extends DataParentComponent {

  eventName;
  selectedDataUnit;
  dataUnits;
  chartOptions;

   /** The corresponding services related to the Temperature chart build are injected into the component */
  constructor(protected chartService: TemperatureChartService, 
              protected processDataService: ProcessTemperatureDataService, 
              protected socketService: SocketService ) {
    super()
    // Set the event socket name           
    this.eventName = "temperature"
    // The corresponding temperature data possible units
    this.dataUnits=this.processDataService.listUnits
    // The selected data unit for display
    this.selectedDataUnit=this.processDataService.selectedDataUnit;
    // Init the temperature chart options
    this.chartOptions= this.chartService.setChartOptions(this.startDate,
                                            this.endDate,
                                            this.selectedDataUnit);
   }

}
