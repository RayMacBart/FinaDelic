class TimeDataPoster {

   constructor() {
      this.CSRFToken = document.querySelector('meta[name="csrf-token"]').content;
   }

   async storeTimeSpan(start, end) {
      const packet = { start: start, end: end };
      const response = await fetch('/setTime', {method: 'POST',
                                               headers: {
                                                  'Content-Type': 'application/json',
                                                  'CSRF-Token': this.CSRFToken
                                                   },
                                                body: JSON.stringify(packet)
                                                }
                                   );
      if (response.status === 422) {
         showInfo('invalidData', 'warning', null, errName);
      }
      if (response.status === 507) {
         showInfo('dataStorageError', 'warning', null, errName);
      }
   }
}

const timeDataPoster = new TimeDataPoster();

export default timeDataPoster;