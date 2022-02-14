import { OnInit, Inject, Directive } from '@angular/core';

import { DataPoint } from '../../interfaces/data-point';
import { DataPointToPlot } from '../../interfaces/data-point-to-plot';


import { EChartsOption } from 'echarts';

import * as moment from 'moment';
import { TestModuleMetadata } from '@angular/core/testing';

import { SocketService } from '../../services/socket/socket.service';

import { EnergyChartService } from '../../services/charts/energy-chart.service';
import { TemperatureChartService } from '../../services/charts/temperature-chart.service';

import { ProcessEnergyDataService } from '../../services/process-data/process-energy-data.service';
import { ProcessTemperatureDataService } from '../../services/process-data/process-temperature-data.service';

import { Data } from '@angular/router';

/**
 * Abstract class to define the basic structure of a data component that will display a visualization chart that updates with
 * real-time data.
 */

@Directive(  {selector: 'data-chart-base'})

export abstract class DataParentComponent implements OnInit {

  /** The name of the socker event where the information is being emited */
  abstract eventName: string;
  /** The unit to display the data */
  abstract selectedDataUnit: string;
  /** All possible data units the user can select to display the data */
  abstract dataUnits: {[key: string]:string};
  /** The configuration to display the chart */
  abstract chartOptions: EChartsOption;

  /** The service to manage the socket connection */
  protected abstract socketService: SocketService;
  /** The service to process the data (convert to certain unit, get the time point taking into account the current date) */
  protected abstract processDataService: ProcessEnergyDataService | ProcessTemperatureDataService;
  /** The service that has the methods to display and configure the chart */
  protected abstract chartService: EnergyChartService | TemperatureChartService;

  /** Last data record retrieved from the socket */
  lastDataPoint: DataPoint | null = null;
  /** Last data point plotted into the chart */
  lastDataPointToPlot: DataPointToPlot | null = null;
  
  /** List with the data is being passed to the chart to display (The x data (time points) and the y data (data values)) */
  listToPlot: [Date,number][] = [];
  /** List with the data objects that are being plotted into the chart */
  listDataPointsToPlot: (DataPointToPlot|null)[] = [];
  
  /** Update configuration to the chart, where new data that is being received is added to the chart */
  updateOptions: EChartsOption = {};
 
  /** Visualization start date, using the current date */
  startDate: Date = new Date();
  /** Visualization init end date, starting with 1 minute, this will be changing as new data is coming */
  endDate: Date = moment(this.startDate).add(1, 'm').toDate();
  

  constructor() { 
    
  }
  

  ngOnInit(): void {
    /** Stream the data from the socket and create/update a chart where to visualize the data */
    this.streamData();
  }

  
  /** Function that manages the operations needed when a user wants to change the data units */
  onUnitChange(): void {
   
    // Iterate through the list of data points objects that are plotted in the chart 
    this.listDataPointsToPlot.map((dataPoint: DataPointToPlot | null, index:number): any => {
        if(dataPoint) {
          // Convert them to the desired units and update the value in the list that will be used to update the data in the chart
          let dataPointConverted=this.processDataService.convertDataValue({value:dataPoint.value, unit: dataPoint.unit},this.selectedDataUnit)
          this.listToPlot[index][1]=dataPointConverted.value;
          
          // When the last element is processed, used it to update the variable with the last data point object plotted 
          if (index == this.listDataPointsToPlot?.length - 1) {
            if (this.lastDataPointToPlot) {
              this.lastDataPointToPlot= {... dataPointConverted, time: this.lastDataPointToPlot.time}
              this.processDataService.lastDataPointToPlot=this.lastDataPointToPlot
            }
            
          }
          
        }
       
    });
    
    // Convert also the last raw data point received to the selected unit
    if (this.lastDataPoint) {
       this.lastDataPoint={...this.processDataService.convertDataValue(this.lastDataPoint,this.selectedDataUnit), time:this.lastDataPoint.time }
      
      }
    // Update the chart
    this.updateOptions = this.chartService.updateChartOptions(this.endDate,
      this.selectedDataUnit,
      this.listToPlot)
  
    
  }

  /** Stream the data from the socket and create/update a chart where to visualize the data */
  streamData(): void {
    
    // The SocketService has a method to subscribe to the backend socket event
    this.socketService.getUpdates(this.eventName).subscribe((latestData: DataPoint) => 
      {
        // The data record obtained from the socket is processed in order to plot it in the chart
        // (changing if needed the units, getting the current date for the emision, transforming the raw data to the chart value)
        let DataPointToPlot=this.processDataService.processDataPoint(latestData,this.startDate,this.selectedDataUnit);
        
        // Getting the last data record obtained, but converted to the corresponding visualization units
        this.lastDataPoint= this.processDataService.dataPointConverted;
        // Getting the last data record processed (the time value is changed to the actual date) and the value is the transformed one
        this.lastDataPointToPlot=DataPointToPlot;
        // Save the last data record processed that is being plot into a list
        this.listDataPointsToPlot.push(DataPointToPlot);

        // Add the data to be plotted in an array with the elements following the format needed to be passed to the chart
        this.listToPlot.push([
          DataPointToPlot.time,
          DataPointToPlot.value
        ])

       
        // Update the limit time date in the X axis if it is more recent than the current limit
        if (this.endDate < DataPointToPlot.time) {
          this.endDate= DataPointToPlot.time;
        }
        // Update the chart with the new data and options
        this.updateOptions = this.chartService.updateChartOptions(this.endDate,
                                                                  this.selectedDataUnit,
                                                                  this.listToPlot)
      
      })
  }

}
