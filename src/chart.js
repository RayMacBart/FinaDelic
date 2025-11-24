class Chart {

   type = 'line';
   bags = {};  // keys: paths, values: array of (ALL! also nested) flows

   constructor(dummyData) {
      this.dummyData = dummyData;
   }


}

export default Chart;