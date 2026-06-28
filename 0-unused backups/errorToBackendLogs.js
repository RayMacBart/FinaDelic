// purpose:
// Place at top of index.js (authenticated frontend) to forward errors to be logged at backend.

window.onerror = function(message, source, lineno, colno, error) {
   fetch('/client-errorLog', {
                              method: 'POST',
                              headers: {'Content-Type': 'application/json',
                                        'CSRF-Token': CSRFToken
                                       },
                              body: JSON.stringify({message, source, lineno, colno, stack: error?.stack || null})
   });
};
window.onunhandledrejection = function(event) {
   fetch('/client-errorLog', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'CSRF-Token': CSRFToken
      },
      body: JSON.stringify({
         type: 'unhandledrejection',
         reason: event.reason?.message,
         stack: event.reason?.stack
      })
   });
};