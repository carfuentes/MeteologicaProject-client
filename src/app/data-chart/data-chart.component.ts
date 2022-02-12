import { Component, Input, OnInit } from '@angular/core';

import { DataPoint } from '../interfaces/data-point';
import { EChartsOption } from 'echarts';

import * as moment from 'moment';
import { TestModuleMetadata } from '@angular/core/testing';

import { SocketService } from '../services/socket.service';
import { ChartService } from '../services/chart.service';


import { ProcessEnergyDataService } from '../services/process-data/process-energy-data.service';
import { ProcessTemperatureDataService } from '../services/process-data/process-temperature-data.service';
import { Data } from '@angular/router';
import { DataPointToPlot } from '../interfaces/data-point-to-plot';


@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.css']
})
export class DataChartComponent implements OnInit {



  @Input() eventName: string;
  @Input() processDataService: ProcessEnergyDataService | ProcessTemperatureDataService;
  
  selectedDataUnit: string;
  dataUnits: string[];

  lastDataPoint: DataPoint | null = null;
  lastDataPointToPlot: DataPointToPlot | null = null;
  
  listToPlot: [Date,number][] = [];
  
  chartOptions: EChartsOption;

  updateOptions: EChartsOption = {};
  loadingChart: boolean = false;

  startDate: Date = new Date();
  endDate: Date = moment(this.startDate).add(1, 'm').toDate();

  constructor(private socketService: SocketService, 
              private chartService: ChartService) { 
              
          
  }

  ngOnInit(): void {
    
    this.dataUnits=this.processDataService.listUnits
    this.selectedDataUnit=this.dataUnits[0];
    this.chartOptions= this.chartService.setChartOptions(this.startDate,
                                            this.endDate,
                                            this.selectedDataUnit);

    

    this.streamData();
  }

  

  onUnitChange(): void {
   
   

    // this.listDataPoints.map((dataPoint: DataPoint, index): any => {
    //     let convertVal=this.unitsService.convertDataValue(dataPoint,this.selectedDataUnit)
    //     this.listDataValues[index][1]=convertVal;
    // });

    // if (this.lastDataPoint) {
    //   this.lastDataValue=this.unitsService.convertDataValue(this.lastDataPoint,this.selectedDataUnit)
    // }

    // this.updateOptions = this.chartService.updateChartOptions(this.endDate,
    //   this.selectedDataUnit,
    //   this.listDataValues)
  
    
  }


  streamData(): void {
    this.socketService.getUpdates(this.eventName).subscribe((latestData: DataPoint) => 
      {
        //this.listDataPoints.push(latestData);
        
        let DataPointToPlot=this.processDataService.processDataPoint(latestData,this.startDate,this.selectedDataUnit);

        this.lastDataPoint= this.processDataService.dataPointConverted;
        this.lastDataPointToPlot=DataPointToPlot;

        this.listToPlot.push([
          DataPointToPlot.time,
          DataPointToPlot.value
        ])

       
     
        if (this.endDate < DataPointToPlot.time) {
          this.endDate= DataPointToPlot.time;
        }

        this.updateOptions = this.chartService.updateChartOptions(this.endDate,
                                                                  this.selectedDataUnit,
                                                                  this.listToPlot)
      
      })
  }

}
