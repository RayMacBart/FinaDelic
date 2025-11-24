import dataPreparator from './chartPage_src/dataPreparator.js';
import { Chart, Colors, Legend, LineController, LineElement, PointElement, CategoryScale, LinearScale, PieController, ArcElement } from 'chart.js';
Chart.register(Colors, Legend, LineController, LineElement, PointElement, CategoryScale, LinearScale, PieController, ArcElement);


class ChartPage {

   constructor(dummyData, modal, chart) {
      this.dummyData = dummyData;
      this.chart = chart;
      this.dataPrep = new dataPreparator(dummyData, chart);
   }


   #renderChart() {

      let dataObj;
      if (this.chart.type === 'line') {
         dataObj = this.dataPrep.prepareLineChartData();
         console.log(dataObj);
      }

      (async function() {
         const data = [
            { year: 1987, count: 30 },
            { year: 1988, count: 28 },
            { year: 1989, count: 10 },
            { year: 1990, count: 20 },
            { year: 1991, count: 15 },
            { year: 1992, count: 25 },
            { year: 1993, count: 22 },
            { year: 1994, count: 30 },
            { year: 1995, count: 28 },
            { year: 1996, count: 10 },
            { year: 1997, count: 20 },
            { year: 1998, count: 15 },
            { year: 1999, count: 25 },
            { year: 2000, count: 22 },
            { year: 2001, count: 30 },
         ];
         const data2 = [
            { year: 2002, count: 28 },
            { year: 2003, count: 10 },
            { year: 2004, count: 20 },
            { year: 2005, count: 15 },
            { year: 2006, count: 25 },
            { year: 2007, count: 22 },
            { year: 2008, count: 30 },
            { year: 2009, count: 28 },
            { year: 2010, count: 10 },
            { year: 2011, count: 20 },
            { year: 2012, count: 15 },
            { year: 2013, count: 25 },
            { year: 2014, count: 22 },
            { year: 2015, count: 30 },
            { year: 2016, count: 28 },
         ];

         new Chart(
            document.getElementById('chart'),
            {
               type: 'line',
               data: {
               labels: data.map(row => row.year),
                  datasets: [
                     {
                        label: 'data1',
                        data: data.map(row => row.count)
                     },
                     {
                        label: 'data2',
                        data: data2.map(row => row.count)
                     },
                  ]
               }
            }
         );
         })();
 

   }


   #setTimeHeader(timespan) {
      document.getElementById('time-start-chart').innerText = timespan.start.getDate()+'.'+(timespan.start.getMonth()+1)+'.'+timespan.start.getFullYear();
      document.getElementById('time-end-chart').innerText = timespan.end.getDate()+'.'+(timespan.end.getMonth()+1)+'.'+timespan.end.getFullYear();
   }


   #setupChartPageLinks(app) {
      // document.getElementById('switch-icon-tap-area').addEventListener('click', () => ???????); // CALLS SWITCH FUNCTION
      document.getElementById('clock-icon-tap-area').addEventListener('click', () => app.modal.startModal('time')); // OPEN MODAL
      document.getElementById('flows-icon-tap-area').addEventListener('click', () => app.router.navigate('flowPage'));
      document.getElementById('logout-icon-tap-area').addEventListener('click', () => app.router.navigate('loggedoutHP', ['page--landing']));
   }

   setup(app) {
      if (!this.timespan) {
         this.timespan = app.timespan;
      }
      this.#setTimeHeader(app.timespan);
      this.#renderChart();
      this.#setupChartPageLinks(app);
      app.makeIconHoverEffect('switch');
      app.makeIconHoverEffect('clock');
      app.makeIconHoverEffect('flows');
      app.makeIconHoverEffect('logout');
   }
}

export default ChartPage;