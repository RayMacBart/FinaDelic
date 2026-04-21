const passwordRX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[§@.#$!%*?&])[A-Za-z\d§@.#$!%*?&]{8,}$/
const allowedCharRX = /^[A-Za-z\d§@.#$!%*?&]{1,}$/;
const min8RX = /^[A-Za-z\d§@.#$!%*?&]{8,}$/;
const lowerRX = /(?=.*[a-z])[A-Za-z\d§@.#$!%*?&]/;
const upperRX = /(?=.*[A-Z])[A-Za-z\d§@.#$!%*?&]/
const min1digitRX = /(?=.*\d)[A-Za-z\d§@.#$!%*?&]/;
const min1specialRX = /(?=.*[§@.#$!%*?&])[A-Za-z\d§@.#$!%*?&]/;

infoTexts = {
   'emptyPW': 'Please enter your password.',
   'missRepeat': "Please repeat your password.",
   'repeatMismatch': "Your password entries don’t match. Please try again.",
   'password': "Your password does not meet the following requirements:\n",
   'badChars': 'Your password contains special characters which are not allowed. \nPlease only use one of the following characters: \n § @ . # $ ! % * ? & ',
   }

function showInfo(infoTitle, infoType='neutral', listing=null) {
   const box = document.createElement('div');
   const text = document.createElement('p');
   box.appendChild(text);
   text.innerText = infoTexts[infoTitle];
   if (listing) {
      let newText = text.innerText;
      for (const item of listing) {
         newText = ` ${newText}\n --> ${item}`;
      }
      text.innerText = newText;
   }
   const body = document.querySelector('body');
   body.appendChild(box);
   box.classList.add('infobox');
   text.classList.add('infotext');
   if (infoType === 'warning') {
      box.classList.add('infobox--warning');
      text.classList.add('infotext--warning');
   } else if (infoType === 'neutral') {
      box.classList.add('infobox--neutral');
      text.classList.add('infotext--neutral');
   }
   setTimeout(() => {
      body.removeChild(box);
   }, text.innerText.length*40);
}


function handleEmptyCreds(val1, val2) {
   if (!val1) {
      showInfo('emptyPW');
   } else {
      showInfo('missRepeat');
   }
}


function assertPW(PW) {
   let complaints = [];
   if (!(min8RX.test(PW))) {
      complaints.push('min. length = 8 characters');
   }
   if (!(lowerRX.test(PW))) {
      complaints.push('min. 1 lowercase letter');
   }
   if (!(upperRX.test(PW))) {
      complaints.push('min. 1 uppercase letter');
   }
   if (!(min1digitRX.test(PW))) {
      complaints.push('min. 1 digit');
   }
   if (!(min1specialRX.test(PW))) {
      complaints.push('min. 1 special character');
   }

   return complaints;
}


function checkPW(event) {
   event.preventDefault();
   let valid = false;
   if ((!(event.target.form[0].value)) || (!(event.target.form[1].value))) {
      handleEmptyCreds(event.target.form[0].value, event.target.form[1].value);
   } else {
      if (event.target.form[0].value === event.target.form[1].value) {
         const isValidPW = passwordRX.test(event.target.form[1].value);
         if (isValidPW) {

            // BACKEND SEND LOGIC
            
            const form = document.querySelector('form');
            form.style.display = 'none';
            const confirmation = document.getElementById('confirmation');
            confirmation.style.display = 'block';
         } else {
            const noBadChars = allowedCharRX.test(event.target.form[1].value);
            if (noBadChars) {
               const complaints = assertPW(event.target.form[1].value);
               showInfo('password', 'warning', complaints);
            } else {
               showInfo('badChars', 'warning');
            }
         }
      } else {
         showInfo('repeatMismatch', 'warning');
      }
   }
   return valid;
}


document.querySelector('button').addEventListener('click', checkPW);


