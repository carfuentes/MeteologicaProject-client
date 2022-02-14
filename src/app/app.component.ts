import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'Meteologica project';
  
  tabs : {[key: string]: string};

  constructor() {
      
      this.tabs = {
        temperature: "Temperature",
        power: "Energy"
      }

  }
}
