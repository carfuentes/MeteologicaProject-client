# MeteologicaProject-client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2.
In this project, temperature and power data obtained through a web socket is being displayed in real-time in different charts, to visualize the average temperature and the energy,respectively. The user can visualize the data as it is being received and can toggle the data units.

## Getting started

To run the application locally:

- Install Node (>= v16.13.1) and npm (>=8.1.2)
- Move to the project root folder path
- Run `npm install` to install all the dependencies
- Make sure the backend server (MeteologicaProject-server application) is serving in localhost:3000/
- Run `npm start` to run the application in localhost:4200/

## Dependencies

- [`@angular/flex-layout`](https://github.com/angular/flex-layout)
- [`@angular/material`](https://github.com/angular/components)
- [`ngx-echarts`](https://github.com/xieziyu/ngx-echarts)
- [`ngx-socket-io`](https://github.com/rodgc/ngx-socket-io)
- [`rxjs`](https://github.com/reactivex/rxjs)

## Configuration

If the backend server (MeteologicaProject-server application) is serving in other port other than 3000, the environment configuration should be change in the environment files in the folder `src/environments`.
The `socketUrl` property should be change to the one the backed server is listening to, in all the environment files:

```js
export const environment = {
  production: false,
  socketUrl:  /* The url the backend server is listening to */

};
```

If you want to change the application port, you can add the flag `--port $PORT_NUMBER` to any npm command where $PORT_NUMBER is an integer representing the port number in your local computer where the application is going to be served.

## Angular by default npm commands

These are the most useful commands defined in package.json:

- `npm start` - runs the TypeScript compiler, asset copier, and a server at the same time, all three in "watch mode".
- `npm run build` - runs the TypeScript compiler and asset copier once.
- `npm run build:watch` - runs the TypeScript compiler and asset copier in "watch mode"; when changes occur to source files, they will be recompiled or copied into dist/.
- `npm run lint` - runs tslint on the project files.
- `npm run serve` - runs lite-server.

These are the test-related scripts:

- `npm test` - builds the application and runs Intern tests (both unit and functional) one time.
- `npm run ci` - cleans, lints, and builds the application and runs Intern tests (both unit and functional) one time.

## What's in here

This project is based in Angular version 13.3.2 and follows its basic structure.

### Workspace

This referes to the top level of the project and you can read [here](https://angular.io/guide/file-structure#workspace-configuration-files) all the documentation about the files and folders here.

### Application source files

This refers to the `/src` files and you can read [here](https://angular.io/guide/file-structure#workspace-configuration-files) all the documentation about the files and folders in this location.

### Components

This project has three main components: - `src/app/app.component.ts`- The main app component, that has only the logic to diplay the chart tabs and the other components selectors. - `src/app/components/energy-data/energy-data.component.ts`- This is the component that has al the logic to obtain the energy data from the power data records received from the socket in real-time and display it into a chart. It inhertis from an abstract class `src/app/components/data-parent/data-parent.component.ts` thas has all the common functionality that share the components that need to display and process data. - `src/app/components/temperature-data/temperature-data.component.ts`- This is the component that has al the logic to obtain the average temperature data from the temperature data records received from the socket real-time and display it into a chart. It inhertis from an abstract class `src/app/components/data-parent/data-parent.component.ts` thas has all the common functionality that share the components that need to display and process data.

### Services

This project implements the following services:

- The `src/app/services/charts/energy-chart.service.ts` and the `src/app/services/charts/temperature-chart.service.ts`, that inherit both from `src/app/services/charts/chart.service.ts` and are in charge of managing the charts creation and configuration for each of the components, respectively.

- The `src/app/services/process-data/process-energy-data.service.ts` and the `src/app/services/process-data/process-temperature-data.service.ts` that inherit both from `src/app/services/process-data/process-data.service.ts` and are in charge of processing the raw data from the backend server (converting it to the corresponding units) and calculating the data points to be displayed in the chart.

- The `src/app/services/socket/socket.service.ts` that is in charge of receiving the data from the socket connection.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
