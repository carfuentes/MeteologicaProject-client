import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {


  constructor() { }

  setChartOptions(startDate: Date, endDate: Date, unit:string) : EChartsOption {
    
    return {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis',
        
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        
        min: startDate,
        max: endDate,
        name: "Time",
        nameTextStyle: {
          fontFamily: "Montserrat",
          fontSize: "1.5em",
          fontWeight: "bold",
          // color: "blue"
        },
        axisLabel: {
          formatter: (function(value: any){
              return moment(value).format('HH:mm:ss');
          }),
          fontFamily: "Montserrat"
      },
     
      minInterval: 3600 / 5
    
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        name: "Energy",
        nameTextStyle: {
          fontFamily: "Montserrat",
          fontSize: "1.5em",
          fontWeight: "bold",
          // color: "blue"
        },
        min: 0,
        scale: true,
        axisLabel: {
          formatter: '{value} '+ unit,
          fontFamily: "Montserrat"
        }
      },
      series: [
        {
          data: [],
          type: 'line',
        },
      ],
    };

  }

  updateChartOptions(endDate: Date, unit: string, listDataValues: [Date,number][]): EChartsOption {
    return {
      xAxis: {
        max: endDate
      },
      yAxis: {
        min: function (value) {
          return value.min - 2;
        },
        max: function (value) {
            return value.max + 2;
        },
        axisLabel: {
          formatter: '{value} '+ unit
        }
      },
      series: [
        {
          data: listDataValues,

         
        },
      ],
    };
  }


}
