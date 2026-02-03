class TimeDataPoster {

   async storeTimeSpan(start, end) {
      const packet = { start: start, end: end };
      const response = await fetch('/setTime', {method: 'POST',
                                               headers: {
                                                  'Content-Type': 'application/json'
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