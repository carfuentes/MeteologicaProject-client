import { BasicDataPoint } from "./basic-data-point";

/** Interface that represents a data point that is plotted in a chart
 * and therefore, besides the basic information of a data point object, it has
 * time information in a Date format representing the current date for that data point
 * taking into account the streaming/connection date.
 */
export interface DataPointToPlot extends BasicDataPoint {
    time: Date;
  }