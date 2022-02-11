import { Component, Input, OnInit } from '@angular/core';

import { DataPoint } from '../interfaces/data-point';
import { EChartsOption } from 'echarts';

import * as moment from 'moment';
import { TestModuleMetadata } from '@angular/core/testing';

import { SocketService } from '../services/socket.service';
import { ChartService } from '../services/chart.service';
import { TimeUtilsService } from '../services/time-utils.service';


import { UnitsPowerService } from '../services/units/units-power.service';
import { UnitsTemperatureService } from '../services/units/units-temperature.service';
import { last } from 'rxjs';


@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.css']
})
export class DataChartComponent implements OnInit {



  @Input() eventName: string;
  @Input() unitsService: UnitsTemperatureService | UnitsPowerService;
  
  selectedDataUnit: string;
  dataUnits: string[];

  lastDataPoint: DataPoint | null = null;
  lastDataValue: number;

  listDataValues: [Date,number][] = [];
  listDataPoints: DataPoint[] =[];

  chartOptions: EChartsOption;

  updateOptions: EChartsOption = {};
  loadingChart: boolean = false;

  startDate: Date = new Date();
  endDate: Date = moment(this.startDate).add(1, 'm').toDate();

  constructor(private socketService: SocketService, 
              private chartService: ChartService,
              private timeUtilsService: TimeUtilsService) { 
              
          
  }

  ngOnInit(): void {
    
    this.dataUnits=this.unitsService.listUnits
    this.selectedDataUnit=this.dataUnits[0];
    this.chartOptions= this.chartService.setChartOptions(this.startDate,
                                            this.endDate,
                                            this.selectedDataUnit);

    this.streamData();
  }

  

  onUnitChange(): void {
   
   

    this.listDataPoints.map((dataPoint: DataPoint, index): any => {
        let convertVal=this.unitsService.convertDataValue(dataPoint,this.selectedDataUnit)
        this.listDataValues[index][1]=convertVal;
    });

    if (this.lastDataPoint) {
      this.lastDataValue=this.unitsService.convertDataValue(this.lastDataPoint,this.selectedDataUnit)
    }

    this.updateOptions = this.chartService.updateChartOptions(this.endDate,
      this.selectedDataUnit,
      this.listDataValues)
  
    
  }


  streamData(): void {
    this.socketService.getUpdates(this.eventName).subscribe((latestData: DataPoint) => 
      {
       
        this.listDataPoints.push(latestData);
        
        let dataPointVal=this.unitsService.convertDataValue(latestData,this.selectedDataUnit)
        let dataPointDate= this.timeUtilsService.getCurrentDate(latestData.time,this.startDate)

        this.lastDataPoint= latestData;
        this.lastDataValue= dataPointVal;

        let data_val: [Date,number] =  [
              dataPointDate,
              dataPointVal

          ]
        
        this.listDataValues.push(data_val)
       
       
     
        if (this.endDate < dataPointDate) {
          this.endDate= dataPointDate;
        }

        this.updateOptions = this.chartService.updateChartOptions(this.endDate,
                                                                  this.selectedDataUnit,
                                                                  this.listDataValues)
      
      })
  }

}
