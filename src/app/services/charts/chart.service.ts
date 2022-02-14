import { EChartsOption } from 'echarts';
import * as moment from 'moment';

/** Abstract class to implement the basic methods that creates a ECharts Temperature or Energy chart
 * and has also the methods needed to update it with new information
 */
export abstract class ChartService {

  /** Label for the Y axis */
  abstract yAxisName: string;
  /** Minimun for the Y axis */
  abstract minyAxis: number | ((value: {[key: string]: number}) => number);
  /** Color for the line in the Y axis */
  abstract lineColor: string;

  constructor() { }

  /** Function that builds the object with the Echarts chart init options
   * @param startDate: Start connection/streaming date,to set up the origin in the X axis
   * @param endDate: Init end date to set up the the limit in the X axis
   * 
   * @returns Object with the Echarts chart init options
    */
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
        position: 'bottom',
        min: startDate,
        max: endDate,
        name: "Time",
        nameTextStyle: {
          fontFamily: "Montserrat",
          fontSize: "1.5em",
          fontWeight: "bold",
          // color: "blue"
        },
        boundaryGap: [0, '100%'],
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
        offset:0,
        name: this.yAxisName,
        nameTextStyle: {
          fontFamily: "Montserrat",
          fontSize: "1.5em",
          fontWeight: "bold",
          // color: "blue"
        },
        boundaryGap: [0, '100%'],
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
          lineStyle: {color: this.lineColor},
          itemStyle: {color: this.lineColor}
        },
      ],
    };

  }

  /** Function to update the ECharts charts options when receiving new data
   * @param endDate: New end date with the new time point that need to be inserted in the chart
   * @param unit: Unit of the data that is being plotted, to add it to the chart label
   * @param listDataValues: List with the data to be plotted, the time points and the data values
   * 
   * @returns Object with the Echarts chart update options
   */
  updateChartOptions(endDate: Date, unit: string, listDataValues: [Date,number][]): EChartsOption {
    return {
      xAxis: {
        max: endDate
      },
      yAxis: {
        min:this.minyAxis,
        max: function (value) {
            return value.max + 0.5;
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
