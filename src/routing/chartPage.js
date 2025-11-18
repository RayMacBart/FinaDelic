import { Chart, Colors, Legend, LineController, LineElement, PointElement, CategoryScale, LinearScale, PieController, ArcElement } from 'chart.js';
Chart.register(Colors, Legend, LineController, LineElement, PointElement, CategoryScale, LinearScale, PieController, ArcElement);


class ChartPage {

   constructor(dummyData, modal, chart) {
      this.dummyData = dummyData;
      this.chart = chart;
   }


   #renderChart() {
      (async function() {
         const data = [
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
                     label: 'Acquisitions by year',
                     data: data.map(row => row.count)
                  }
               ]
               }
            }
         );
         })();
 

   }


   #setTimeHeader(timespan) {
      document.getElementById('time-start').innerText = timespan.start.getDate()+'.'+(timespan.start.getMonth()+1)+'.'+timespan.start.getFullYear();
      document.getElementById('time-end').innerText = timespan.end.getDate()+'.'+(timespan.end.getMonth()+1)+'.'+timespan.end.getFullYear();
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
      this.#renderChart();
      this.#setTimeHeader(app.timespan);
      this.#setupChartPageLinks(app);
      app.makeIconHoverEffect('switch');
      app.makeIconHoverEffect('clock');
      app.makeIconHoverEffect('flows');
      app.makeIconHoverEffect('logout');
   }
}

export default ChartPage;