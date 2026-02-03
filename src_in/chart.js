class Chart {

   type = 'line';
   bags = {};  // keys: paths, values: objects of (ALL! also nested) flows with dates as keys and amounts as values!

   constructor(appData) {
      this.appData = appData;
   }
}

export default Chart;