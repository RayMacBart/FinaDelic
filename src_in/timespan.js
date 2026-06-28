class TimeSpan {

   setupTimespan(timeObj) {
      this.start = new Date(timeObj.startdate.split('T')[0]);
      this.end = new Date();
      this.rollingEndDate = timeObj.rollingEndDate;
   }      
}

export default TimeSpan;