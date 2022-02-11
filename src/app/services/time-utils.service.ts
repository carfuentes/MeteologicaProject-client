import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeUtilsService {

  constructor() { }

  getCurrentDate(timeString: string, startDate: Date): Date {
    let a = timeString.split(':'); // split it at the colons
  
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
    let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    
    var oldObj = {
      startDate: startDate
     
    }
    var clonnedObj = JSON.parse(JSON.stringify(oldObj))

    let currentDate= new Date(clonnedObj.startDate);
    currentDate.setSeconds(currentDate.getSeconds() + seconds);
    
    return currentDate
  }
}
