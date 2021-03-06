# MeteologicaProject-client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2.
In this project, temperature and power data obtained through a web socket is being displayed in real-time in different charts, to visualize the average temperature and the energy,respectively. The user can visualize the data as it is being received and can toggle the data units.

## Getting started

To run the application locally:

- Install [Node.js](https://nodejs.org/en/download/)( >= v16.13.1) and [npm](https://www.npmjs.com/) (>=8.1.2)
- Move to the project root folder path
- Run `npm install` to install all the dependencies
- Make sure the back-end server ([MeteologicaProject-server application][back-end repo]) is serving in localhost:3000/
- Run `npm start` to run the application in localhost:4200/

## Dependencies

- [`@angular/flex-layout`](https://github.com/angular/flex-layout)
- [`@angular/material`](https://github.com/angular/components)
- [`ngx-echarts`](https://github.com/xieziyu/ngx-echarts)
- [`ngx-socket-io`](https://github.com/rodgc/ngx-socket-io)
- [`rxjs`](https://github.com/reactivex/rxjs)

## Configuration

If the back-end server ([MeteologicaProject-server application][back-end repo]) is serving in other port other than 3000, the environment configuration should be changed in all the environment files in the folder `src/environments`.
The `socketUrl` property is the one reflecting the url the back-end server is listening to.

```js
export const environment = {
  production: false,
  socketUrl:  /* The url the backend server is listening to */

};
```

If you want to change the application port, you can run the command `ng serve --port $PORT_NUMBER` where $PORT_NUMBER is an integer representing the port number in your local computer where the application is going to be served.

## What's in here

This project is based in [Angular CLI](https://github.com/angular/angular-cli) version 13.3.2 and follows its basic structure.

### Workspace

This referes to the top level of the project and you can read [here](https://angular.io/guide/file-structure#workspace-configuration-files) all the documentation about the files and folders in the root project folder.

### Application source files

This refers to the `/src` files and you can read [here](https://angular.io/guide/file-structure#workspace-configuration-files) all the documentation about the files and folders in this location.

### Components

This project has three main components:

- `src/app/app.component.ts`- The main app component, that has only the logic to display the chart tabs and the other components selectors.

- `src/app/components/energy-data/energy-data.component.ts`- This is the component that has al the logic to obtain the energy data from the power data records received from the socket in real-time and display it into a chart. It inhertis from an abstract class `src/app/components/data-parent/data-parent.component.ts` thas has all the common functionality that share the components that need to display and process data.

- `src/app/components/temperature-data/temperature-data.component.ts`- This is the component that has al the logic to obtain the average temperature data from the temperature data records received from the socket real-time and display it into a chart. It inhertis from an abstract class `src/app/components/data-parent/data-parent.component.ts` thas has all the common functionality that share the components that need to display and process data.

### Services

This project implements the following services:

- The `src/app/services/charts/energy-chart.service.ts` and the `src/app/services/charts/temperature-chart.service.ts`, that inherit both from `src/app/services/charts/chart.service.ts` and are in charge of managing the charts creation and configuration for the energy and temperature components, respectively.

- The `src/app/services/process-data/process-energy-data.service.ts` and the `src/app/services/process-data/process-temperature-data.service.ts` that inherit both from `src/app/services/process-data/process-data.service.ts` and are in charge of processing the raw data from the back-end server (converting it to the corresponding units) and calculating the data points to be displayed in the chart.

- The `src/app/services/socket/socket.service.ts` that is in charge of receiving the data from the socket connection.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

[back-end repo]: https://github.com/carfuentes/MeteologicaProject
