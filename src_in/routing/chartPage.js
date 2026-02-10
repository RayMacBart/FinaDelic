import dataPreparator from './chartPage_src/dataPreparator.js';
import { Chart, Colors, Legend, LineController, LineElement, PointElement, CategoryScale, LinearScale, PieController, ArcElement } from 'chart.js';
Chart.register(Colors, Legend, LineController, LineElement, PointElement, CategoryScale, LinearScale, PieController, ArcElement);


class ChartPage {

   legendSize;
   getLegendPluginObj(legendSize) {
      return {
         // display: false,
         position: 'bottom',
         fullSize: true,
         labels: {
            // generateLabels: function()
            color: '#225',
            boxWidth: 23,
            textAlign: 'left',
            padding: 20,
            useBorderRadius: true,
            borderRadius: 6,
            font: {
               size: legendSize,
               weight: 500,
               family: "'Inter', 'sans-serif'",
            }
         }
      }
                     }

   constructor(appData, modal, chart) {
      this.appData = appData;
      this.chart = chart;
      this.dataPrep = new dataPreparator(appData, chart);
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
               data: dataObj[bag].map(row => row.amount),
               borderColor: [
                        "#dd3333",
                        "#3333dd",
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
         )
      }
      return amountSets;
   }


   #switchChart(app) {
      this.chart.type = this.chart.type === 'line' ? 'pie' : 'line';
      app.router.navigate('chartPage');
   }


   #renderChart() {
      let lineDataObj;
      const pageWrap = document.querySelector('.view-wrapper');
      if (pageWrap.getBoundingClientRect().width < 500) {
         this.legendSize = 16;
      } else {
         this.legendSize = 21;
      }
      if (this.chart.type === 'line') {
         document.querySelector('.chart-container').classList.add('line-chart-box');
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

         (async function(getLegendPluginObj, legendSize) {
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
                     borderWidth: lineWidth,
                     maintainAspectRatio: false,
                     layout: {
                        autoPadding: false,
                        // padding: {top: 10},
                     },
                     scales: {
                        y: {
                           ticks: {
                              color: '#1A1A4A',
                              font: {
                                 size: 15
                              }
                           }
                        },
                        x: {
                           ticks: {
                              color: '#1A1A4A',
                              font: {
                                 size: 15
                              }
                           }
                        }
                     },
                     plugins: {
                        // htmlLegend: {containerID: 'legends'},
                        legend: getLegendPluginObj(legendSize)
                     }
                  },
                  // plugins: [htmlLegendPlugin]
               }
            );
         })(this.getLegendPluginObj, this.legendSize);


      } else if (this.chart.type === 'pie') {
         document.querySelector('.chart-container').classList.add('pie-chart-box');
         const pieDataArr = this.dataPrep.preparePieChartData();
         if (pieDataArr.length < 4) {
            document.querySelector('.pie-chart-box').style.height = '16rem';
         } else {
            document.querySelector('.pie-chart-box').style.minHeight = String(5.1*pieDataArr.length)+'rem';
         }
         (async function(getLegendPluginObj, legendSize) {
            new Chart(
               document.getElementById('chart'),
               {
                  type: 'pie',
                  data: {
                     labels: pieDataArr.map(l => l.bagDesc),
                     
                     datasets: [
                        {
                           data: pieDataArr.map(l => l.amount),
                           backgroundColor: [
                        "#dd3333",
                        "#3333dd",
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
                     maintainAspectRatio: false,
                     borderWidth: 0,
                     layout: {
                        autoPadding: false,
                        // padding: {top: 10},
                     },
                     plugins: {
                        // htmlLegend: {containerID: 'legends'},
                        legend: getLegendPluginObj(legendSize)
                     }
                  },
                  // plugins: [htmlLegendPlugin]
               }
            );
         })(this.getLegendPluginObj, this.legendSize);
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
      document.querySelector('.logo--nav').addEventListener('click', () => app.router.navigate('loggedinHP', ['page--landing']));
      document.getElementById('switch-icon-tap-area').addEventListener('click', () => this.#switchChart(app)); // CALLS SWITCH FUNCTION
      document.getElementById('clock-icon-tap-area').addEventListener('click', () => app.modal.startModal('time')); // OPEN MODAL
      document.getElementById('flows-icon-tap-area').addEventListener('click', () => app.router.navigate('flowPage'));
      document.getElementById('logout-icon-tap-area').addEventListener('click', () => window.location.href = '/logout');
   }

   setup(app) {
      if (!this.timespan) {
         this.timespan = app.timespan;
      }
      this.#setTimeHeader(app.timespan);
      this.#renderChart();
      this.#setupChartPageLinks(app);
      document.getElementById('username-chart').innerText = app.appData.username;
      app.makeIconHoverEffect('switch');
      app.makeIconHoverEffect('clock');
      app.makeIconHoverEffect('flows');
      app.makeIconHoverEffect('logout');
   }
}

export default ChartPage;