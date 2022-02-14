import { BasicDataPoint } from "./basic-data-point";

/** Interface that represents a data record obtained from the backend server
 * and besides the basic information of a data point object, it has
 * time information in string format HH:mm:ss representing the time interval the data point has been emitted.
  */
export interface DataPoint extends BasicDataPoint {
    time: string;
   
  }