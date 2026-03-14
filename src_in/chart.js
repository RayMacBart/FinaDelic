import ChartOps from './modals_src/chartOps.js';


class Chart {

   type = 'line';
   bags = {};  // keys: paths, values: objects of (ALL! also nested) flows with dates as keys and amounts as values!

   constructor(app) {
      this.appData = app.appData;
      this.fetchChartPaths(app)
   }

   async fetchChartPaths(app) {
      const response = await fetch('/chartPaths');
      const chartPaths = await response.json();
      const chartOps = new ChartOps();
      for (const path of chartPaths) {
         chartOps.add2chart(path, this.appData.data[path.split('/')[0]], this);
      }
      app.continueConstruction2();
   }
}

export default Chart;