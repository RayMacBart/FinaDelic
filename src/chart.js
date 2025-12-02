class Chart {

   // type = 'line';
   type = 'line';
   bags = {};  // keys: paths, values: objects of (ALL! also nested) flows with dates as keys and amounts as values!

   constructor(dummyData) {
      this.dummyData = dummyData;
   }

   // lineChart = new Chart(
   //                document.getElementById('chart'),
   //                {
   //                   type: 'line',
   //                   data: {
   //                      labels: periodLabels,
   //                      datasets: amountSets
   //                   },
   //                   options: {
   //                      pointStyle: false,
   //                      borderWidth: lineWidth
   //                   }
   //                }
   //             );
   

   // pieChart = new Chart(
   //    document.getElementById('chart'),
   //             {
   //                type: 'pie',
   //                data: {
   //                   labels: Object.keys(pieDataObj),
                     
   //                   datasets: [
   //                      {
   //                         data: Object.values(pieDataObj),
   //                         backgroundColor: [
   //                      "#3333dd",
   //                      "#dd3333",
   //                      "#eedd00",
   //                      "#119911",
   //                      "#bb44bb",
   //                      "#00bbbb",
   //                      "#ee9900",
   //                      "#999999",
   //                      "#aa7744",
   //                      "#555555",
   //                      "#ff8888",
   //                      "#cccccc",
   //                      "#111111"
   //                   ],
   //                      }
   //                   ]
   //                },
   //                options: {
   //                   borderWidth: 0,
   //                   layout: {
   //                      padding: {
   //                         left: 500,
   //                         right: 500,
   //                         bottom: 20
   //                      },
   //                   },
   //                   plugins: {
   //                      legend: {
   //                         position: 'bottom',
   //                         align: 'left',
   //                         maxWidth: 320,
   //                         labels: {
   //                            generateLabels: function() {},
   //                            color: '#336',
   //                            boxWidth: 25,
   //                            textAlign: 'left',
   //                            padding: 20,
   //                            useBorderRadius: true,
   //                            borderRadius: 6,
   //                            font: {
   //                               size: 25,
   //                               weight: 500,
   //                               family: "'Inter', 'sans-serif'",
   //                            }
   //                         }
   //                      }
   //                   }
   //                }
   //             }
   //          );
}

export default Chart;