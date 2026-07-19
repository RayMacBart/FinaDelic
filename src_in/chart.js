import ChartOps from './modals_src/chartOps.js';


class Chart {

   type = 'line';
   bags = {};  // keys: paths, values: objects of (ALL! also nested) flows with dates as keys and amounts as values!

   constructor(app) {
      this.appData = app.appData;
      this.chartOps = new ChartOps(app.appData);
      this.chartRefreshDone = false;
      this.chartPageFirst = false;
      const routeinfoEl = document.getElementById('routeinfo');
      const wantedpage = routeinfoEl ? routeinfoEl.textContent : null;
      if (routeinfoEl && wantedpage && (wantedpage.slice(1) === 'chartPage')) {
         this.chartPageFirst = true;
      }
      if (!this.chartPageFirst) {
         this.fetchChartPaths(app)
      }
   }

   async fetchChartPaths(app, refresh=false) {
      const response = await fetch('/chartPaths');
      const chartPaths = await response.json();
      for (const path of chartPaths) {
         if (path.split('/')[0] === 'IN') {
            this.chartOps.add2chart(path, app.appData.data['IN'], this);
         } else if (path.split('/')[0] === 'OUT') {
            this.chartOps.add2chart(path, app.appData.data['OUT'], this);
         }
      }
      if (refresh) {
         app.router.navigate('chartPage');
         this.chartRefreshDone = true;
      }
   }
}

export default Chart;