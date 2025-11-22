class Chart {

   type = 'line';
   bags = {'IN/official/teaching': null, 'OUT/inofficial/Auto': null};  // keys: paths, values: array of (ALL! also nested) flows

   constructor(dummyData) {
      this.dummyData = dummyData;
   }


}

export default Chart;