class TimeSpan {
   constructor (app) {
      this.fetchTime(app);
   }

   setupTimespan(timeObj) {
      this.start = new Date(timeObj.startdate.split('T')[0]);
      this.end = new Date();
      this.rollingEndDate = timeObj.rollingEndDate;
   }

   
   async fetchTime() {
      const response = await fetch('/time');
      const timeObj = await response.json();
      localStorage.setItem('timespan', JSON.stringify(timeObj));
      this.setupTimespan(timeObj);
   }


   async loadFromBackendFirst(app) {
      await this.fetchTime();
      app.setAppData();
   }
      
}

export default TimeSpan;