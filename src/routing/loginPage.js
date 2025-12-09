import { showInfo } from "../infos";


class LoginPage {

   emailRX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   passwordRX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[§@.#$!%*?&])[A-Za-z\d§@.#$!%*?&]{8,}$/
   allowedCharRX = /^[A-Za-z\d§@.#$!%*?&]{1,}$/;
   min8RX = /^[A-Za-z\d§@.#$!%*?&]{8,}$/;
   lowerRX = /(?=.*[a-z])[A-Za-z\d§@.#$!%*?&]/;
   upperRX = /(?=.*[A-Z])[A-Za-z\d§@.#$!%*?&]/
   min1digitRX = /(?=.*\d)[A-Za-z\d§@.#$!%*?&]/;
   min1specialRX = /(?=.*[@.#$!%*?&])[A-Za-z\d§@.#$!%*?&]/;


   #handleEmptyCreds(val1, val2) {
      if (!val1 && !val2) {
            showInfo('allEmpty');
         } else if (!val1) {
            showInfo('emptyEmail');
         } else {
            const isValidEmail = this.emailRX.test(val1);
            if (isValidEmail) {
               showInfo('emptyPW');
            } else {
               showInfo('invalidEmail', 'warning');
            }
         }
   }

   #assertPW(PW) {
      let complaints = [];
      if (!(this.min8RX.test(PW))) {
         complaints.push('min. length = 8 characters');
      }
      if (!(this.lowerRX.test(PW))) {
         complaints.push('min. 1 lowercase letter');
      }
      if (!(this.upperRX.test(PW))) {
         complaints.push('min. 1 uppercase letter');
      }
      if (!(this.min1digitRX.test(PW))) {
         complaints.push('min. 1 digit');
      }
      if (!(this.min1specialRX.test(PW))) {
         complaints.push('min. 1 special character');
      }

      return complaints;
   }


   #signIn(event) {
      event.preventDefault();
      if ((!(event.target.form[0].value)) || (!(event.target.form[1].value))) {
         this.#handleEmptyCreds(event.target.form[0].value, event.target.form[1].value);
      } else {
         const isValidEmail = this.emailRX.test(event.target.form[0].value);
         if (isValidEmail) {
            const isValidPassword = this.passwordRX.test(event.target.form[1].value);
            if (isValidPassword) {
               console.log('sending2backend...');
               // async BACKEND SEND AND REACT UPON RESPONSE (e.g. app.router.navigate('flowPage') or showInfo('invalidLogin', 'warning')) LOGIC HERE
            } else {
               showInfo('invalidLogin', 'warning');
            }
         } else {
            showInfo('invalidLogin', 'warning');
         }
      }
   }


   #signUp(event) {
      event.preventDefault();
      if ((!(event.target.form[0].value)) || (!(event.target.form[1].value))) {
         this.#handleEmptyCreds(event.target.form[0].value, event.target.form[1].value);
      } else {
         const isValidEmail = this.emailRX.test(event.target.form[0].value);
         if (isValidEmail) {
            if (event.target.form[2].value) {
               if (event.target.form[1].value === event.target.form[2].value) {
                  const isValidPassword = this.passwordRX.test(event.target.form[2].value);
                  if (isValidPassword) {
                     if (event.target.form[3].checked && event.target.form[4].checked) {
                        console.log('sending2backend...');  
                        // async BACKEND SEND AND REACT UPON RESPONSE (e.g. app.router.navigate('flowPage') or showInfo('taken'))) LOGIC HERE
                     } else {
                        showInfo('checkBoxes', 'warning');
                     }
                  } else {
                     const noBadChars = this.allowedCharRX.test(event.target.form[2].value);
                     if (noBadChars) {
                        const complaints = this.#assertPW(event.target.form[1].value);
                        showInfo('password', 'warning', complaints);
                     } else {
                        showInfo('badChars', 'warning');
                     }
                  }
               } else {
                  showInfo('repeatMismatch', 'warning');
               }
            } else {
               showInfo('missRepeat');
            }
         } else {
            showInfo('invalidEmail', 'warning');
         }
      }
   }


   #setupLoginPageLinks(app) {
      document.querySelector('.loginBackButton').addEventListener('click', () => app.router.navigate('loggedoutHP', ['page--landing']));
      document.getElementById('sign-in-submit-button').addEventListener('click', this.#signIn.bind(this));
      document.getElementById('inline-terms-link').addEventListener('click', (event) => {
                                                                                    event.preventDefault();
                                                                                    app.router.navigate('terms');
                                                                                    }
                                                                   );
      document.getElementById('inline-privacy-link').addEventListener('click', (event) => {
                                                                                    event.preventDefault();
                                                                                    app.router.navigate('privacy');
                                                                                    }
                                                                   );
      document.getElementById('sign-up-submit-button').addEventListener('click', this.#signUp.bind(this));
   }

   async setup(app) {
      this.#setupLoginPageLinks(app);
      await app.lazyLoader.importSVG('FinaDelic Logo Hero', 'heroLogoBox', ['logo', 'logo--hero']);
   }
}

export default LoginPage;