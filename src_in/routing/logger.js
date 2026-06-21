const logg = (logObj) => {
   let CSRFToken = null;
   try {
      CSRFToken = document.querySelector('meta[name="csrf-token"]')?.content || null;
   } catch (e) {
      CSRFToken = null;
   }
   logObj['CSRFToken'] = CSRFToken;
   fetch('/client-errorLog', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
               'CSRF-Token': CSRFToken
      },
      body: JSON.stringify(logObj)
   });
}

export default logg;