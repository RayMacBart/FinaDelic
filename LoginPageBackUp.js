import InputChecker from "./loginPage_src/inputChecker.js";
import SIA from "./loginPage_src/serverInteraction.js";
import { showInfo } from "../infos.js";


class LoginPage {

   
   constructor() {
      this.resetModal = document.getElementById('reset-modal');
      this.inputChecker = new InputChecker();
   }
   

   #signIn(event) {
      event.preventDefault();
      const valid = this.inputChecker.checkSignIn(event);
      if (valid) {
         SIA.execSignIn(event);
         // async BACKEND SEND AND REACT UPON RESPONSE (e.g. app.router.navigate('flowPage') or showInfo('invalidLogin', 'warning')) LOGIC HERE
      }
   }

   

   #signUp(event) {
      event.preventDefault();
      // const valid = this.inputChecker.checkSignUp(event);
      const valid = true;
      if (valid) {
         SIA.execSignUp(event);  
      }
   }


   #submitReset(event) {
      event.preventDefault();
      const mailInput = event.target.form[0].value;
      const isValidEmail = this.inputChecker.emailRX.test(mailInput);
      if (isValidEmail) {

         // POST REQUEST WITH MAILINPUT TO BACKEND -
         // IF EMAIL IS FOUND AT BACKEND - THEN SEND THE EMAIL.
         // ELSE: CONSIDER CREATING ANOTHER SHOWINFO-BOX: EMAIL NOT FOUND!
         
         this.resetModal.close();
         showInfo('emailSent');
      } else {
         document.getElementById('invalMailWarn').style.display = 'block';
      }
   }

   #openResetModal(event) {
      event.preventDefault();
      this.resetModal.showModal();
      document.getElementById('invalMailWarn').style.display = 'none';
      document.getElementById('reset-modal-input').value = '';
      document.getElementById('resetSubmitButton').addEventListener('click', this.#submitReset.bind(this));
   }


   #setupLoginPageLinks(app) {
      document.querySelector('.loginBackButton').addEventListener('click', () => app.router.navigate('loggedoutHP', ['page--landing']));
      document.getElementById('forgotPWlink').addEventListener('click', this.#openResetModal.bind(this));
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