
const fetchDerivedKeyBase64 = async (saltBase64) => {
   const CSRFToken = document.querySelector('meta[name="csrf-token"]').content;
   const response = await fetch('/deriveKey', {method: 'POST',
                                             headers: {
                                                'Content-Type': 'application/json',
                                                'CSRF-Token': CSRFToken
                                                },
                                              body: JSON.stringify({saltBase64: saltBase64})
   });
   const respObj = await response.json();
   return respObj['keyBase64'];
}

export default fetchDerivedKeyBase64;