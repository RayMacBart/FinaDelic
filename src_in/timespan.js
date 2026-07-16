class TimeSpan {

   setupTimespan(timeObj) {
      this.start = new Date(timeObj.startdate.split('T')[0]);
      this.rollingEndDate = timeObj.rollingEndDate;
      if (this.rollingEndDate) {
         this.end = new Date();
      } else {
         this.end = new Date(timeObj.enddate.split('T')[0]);
      }
   }      
}

export default TimeSpan;