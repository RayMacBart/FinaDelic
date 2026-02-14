class TimeSpan {
   constructor (app) {
      this.fetchTime(app);
   }

   async fetchTime(app) {
      const response = await fetch('/time');
      const timeObj = await response.json();
      this.end = new Date(timeObj.enddate.split('T')[0]);
      this.start = new Date(timeObj.startdate.split('T')[0]);
      app.setAppData();
   }
}

export default TimeSpan;