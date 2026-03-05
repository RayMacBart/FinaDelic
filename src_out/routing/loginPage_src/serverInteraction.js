import { showInfo } from "../../infos.js";

class SIA {
   static async execSignIn(event) {
      const CSRFToken = document.querySelector('meta[name="csrf-token"]').content;
      const response = await fetch('/signin', {
                                                method: 'POST',
                                                body: JSON.stringify({email: event.target.form[0].value,
                                                                      password: event.target.form[1].value}),
                                                headers: {
                                                   'Content-Type': 'application/json',
                                                   'CSRF-Token': CSRFToken
                                                }
                                             });
      if (response.status === 403) {
         showInfo('failedSignin', 'warning');
      } else if (response.status === 303) {
         window.location.href = '/';
      }
   }

   static async execSignUp(event) {
      const CSRFToken = document.querySelector('meta[name="csrf-token"]').content;
      const response = await fetch('/signup', {
                                                method: 'POST',
                                                body: JSON.stringify({email: event.target.form[0].value,
                                                                      password: event.target.form[1].value,
                                                                      repeat: event.target.form[2].value}),
                                                headers: {
                                                   'Content-Type': 'application/json',
                                                   'CSRF-Token': CSRFToken
                                                }
                                             });
      const status = response.status;
      if (status === 404) {
         alert("We are sorry!\nYour sign up failed due to a server error.\nWe'll fix it fast!");
      } else if (status === 409) {
         showInfo('taken');
      } else if (status === 406) {
         showInfo('invalidPW', 'warning');
      } else if (status === 400) {
         showInfo('repeatMismatch', 'warning');
      } else if (status === 422) {
         const body = await response.json();
         showInfo('ValErr', 'warning', null, body.path);
      } else if (status === 303) {
         window.location.href = '/';
      }
   }
}

export default SIA;