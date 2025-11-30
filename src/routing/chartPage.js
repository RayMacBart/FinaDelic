import dataPreparator from './chartPage_src/dataPreparator.js';
import { Chart, Colors, Legend, LineController, LineElement, PointElement, CategoryScale, LinearScale, PieController, ArcElement } from 'chart.js';
Chart.register(Colors, Legend, LineController, LineElement, PointElement, CategoryScale, LinearScale, PieController, ArcElement);


class ChartPage {

   constructor(dummyData, modal, chart) {
      this.dummyData = dummyData;
      this.chart = chart;
      this.dataPrep = new dataPreparator(dummyData, chart);
   }


   createPeriodLabels(dataObj) {
      const periodLabels = [];
      for (const bag in dataObj) {
         for (const row of dataObj[bag]) {
            periodLabels.push(row.period);
         }
         break;
      }
      return periodLabels;
   }


   createAmountSets(dataObj) {
      const amountSets = [];
      for (const bag in dataObj) {
         amountSets.push(
            {
               label: bag,
               data: dataObj[bag].map(row => row.amount)
            }
         )
      }
      return amountSets;
   }


   #renderChart() {

      let lineDataObj;
      if (this.chart.type === 'line') {
         lineDataObj = this.dataPrep.prepareLineChartData();
         const periodLabels = this.createPeriodLabels(lineDataObj);
         const amountSets = this.createAmountSets(lineDataObj);
         let lineWidth;
         const canvasXpos = document.querySelector('canvas').getBoundingClientRect().x;
         if (canvasXpos < 150) {
            lineWidth = 2;
         } else if (canvasXpos < 400) {
            lineWidth = 3;
         } else {
            lineWidth = 4;
         }

         (async function() {
            new Chart(
               document.getElementById('chart'),
               {
                  type: 'line',
                  data: {
                     labels: periodLabels,
                     datasets: amountSets
                  },
                  options: {
                     pointStyle: false,
                     borderWidth: lineWidth
                  }
               }
            );
         })();

      } else if (this.chart.type === 'pie') {
         const pieDataObj = this.dataPrep.preparePieChartData();
         (async function() {
            new Chart(
               document.getElementById('chart'),
               {
                  type: 'pie',
                  data: {
                     labels: Object.keys(pieDataObj),
                     
                     datasets: [
                        {
                           data: Object.values(pieDataObj),
                           backgroundColor: [
                        "#3333dd",
                        "#dd3333",
                        "#eedd00",
                        "#119911",
                        "#bb44bb",
                        "#00bbbb",
                        "#ee9900",
                        "#999999",
                        "#aa7744",
                        "#555555",
                        "#ff8888",
                        "#cccccc",
                        "#111111"
                     ],
                        }
                     ]
                  },
                  options: {
                     borderWidth: 0
                  }
               }
            );
         })();
      }
   

      // ALSO TODO: 
      // - IMPLEMENT CHART-TYPE-SWITCH-BUTTON FUNCTIONALITY
      // - FOR EVERY INPUT IN EVERY MODAL: INPUT VALIDATION!!!

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