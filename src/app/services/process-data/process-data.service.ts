import { DataPoint } from 'src/app/interfaces/data-point'
import { DataPointToPlot } from 'src/app/interfaces/data-point-to-plot'
import { BasicDataPoint } from "src/app/interfaces/basic-data-point";

/** Abstract class to define the basic operations needed to process a data point with temperature or power information
 * and get the transformed value that will be displayed in the component chart
  */
export abstract class ProcessDataService {

  /** Object where the keys are the units of the data displayed in the chart and the values the 
   * units from the raw data */
  abstract listUnits: {[key: string]:string};
  /** Object with the functions to convert the data from a unit to another */
  abstract conversionTable: { [key: string]: Function};
  
  /** Number of seconds of the user connection (since the user connects unitl it refreshes or ends the connection) */
  seconds :number= 0;
  /** Number of data points plotted so far in the chart during a user connection */
  nDataPointsPlotted: number =0;

  /** Last data point plotted into the chart */
  lastDataPointToPlot : DataPointToPlot = {time: new Date(''), value: 0, unit: ''};

  /** Last data record received and converted to the user selected unit */
  dataPointConverted: DataPoint | null = null;
  

  constructor() { 
    
  }

  /** Function to convert a data point from a specific unit to the selected unit, if necessary 
   * @param dataPoint: Object representing a data point with value and unit fields
   * @param selectedUnit: The unit the data should be converted to
   * 
   * @returns An object representing the data point converted to the supplied units
  */
  convertDataValue(dataPoint: BasicDataPoint,selectedUnit: string ): BasicDataPoint {
    let conversion: string = `${dataPoint.unit in this.listUnits ? this.listUnits[dataPoint.unit]: dataPoint.unit}-${selectedUnit}`;
    // Only convert if necessary
    dataPoint.value= (conversion in this.conversionTable) ? this.conversionTable[conversion](dataPoint.value): dataPoint.value;
    dataPoint.unit=selectedUnit;
    return dataPoint;

  }

  /** Function to add to a date the time represented in a string with format HH:mm:ss
   * @param timeString: String with format HH:mm:ss
   * @param startDate: Date to which the string time wants to be added (when the connection/streaming started) 
   * 
   * @returns The date when the data is being received (taking into account the streaming user date)
  */
  getCurrentDate(timeString: string, startDate: Date): Date {
    // Split it at the colons and save into array
    let timeArr = timeString.split(':'); 
  
    // Transalte to seconds the HH:mm:ss string and add to the total seconds of execution
    this.seconds = (+timeArr[0]) * 60 * 60 + (+timeArr[1]) * 60 + (+timeArr[2]);
    
    // Copy the starting date to not override the variable
    var oldObj = {
      startDate: startDate
     
    };
    var clonnedObj = JSON.parse(JSON.stringify(oldObj))
    let currentDate= new Date(clonnedObj.startDate);

    //Add the total seconds of execution to obtain the current data point date taking into account the connection date
    currentDate.setSeconds(currentDate.getSeconds() + this.seconds);
    
    return currentDate;
  }

  /** Function to round the result of a divison 
   * @param num: Number to round
   * 
   * @returns Rounded number
  */
  roundValue(num: number) {
    return Math.round( num * 1000 + Number.EPSILON ) / 1000;
  }

  /** Abstract function where the data to plot is calculated using the raw data and the time information
   * @param dataPoint: Object with the raw data record
   * @param newDataPointToPlot: Object with the final data point to be plotted
   * 
   * @returns Object with the final data point to be plotted 
  */
  abstract getFinalValue(dataPoint: DataPoint, newDataPointToPlot: DataPointToPlot): DataPointToPlot; 

  /** Function where the raw data record is processed into the final data point that will be plotted into the
   * component chart.
   * @param dataPoint: Object representing a raw data object
   * @param startDate: Start date of the connection/streaming
   * @param selectedDataUnit: The unit the data should be converted to
   * 
   * @returns Object with the final data point to be plotted
   */
  processDataPoint(dataPoint: DataPoint, startDate: Date, selectedDataUnit: string) {
    // Init object representing the final data point
    let newDataPointToPlot: DataPointToPlot = {time: new Date(''), value: 0, unit: ''}
    // Count the number of data points being plotted
    this.nDataPointsPlotted+=1;
    
    // Get converted data point to desired units
    this.dataPointConverted = {...this.convertDataValue({value: dataPoint.value, unit: dataPoint.unit},selectedDataUnit), time: dataPoint.time} 

    // Get the current date of the data received
    newDataPointToPlot.time=this.getCurrentDate(dataPoint.time,startDate);
    
    // Get the data point to plot
    newDataPointToPlot=this.getFinalValue(this.dataPointConverted, newDataPointToPlot);

    // Set to last data attribute
    this.lastDataPointToPlot = newDataPointToPlot; 
    
    return newDataPointToPlot;

  }
}
