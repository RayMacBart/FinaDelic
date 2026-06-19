import InputChecker from "./loginPage_src/inputChecker.js";
import SIA from "./loginPage_src/serverInteraction.js";
import { showInfo } from "./loginPage_src/infos.js";


class LoginPage {

   
   constructor() {
      this.resetModal = document.getElementById('reset-modal');
      this.inputChecker = new InputChecker();
      this.submitResetFunc = this.#submitReset.bind(this);
   }
   

   #signIn(event) {
      event.preventDefault();
      const valid = this.inputChecker.checkSignIn(event);
      if (valid) {
         SIA.execSignIn(event);
      }
   }

   

   #signUp(event) {
      event.preventDefault();
      const valid = this.inputChecker.checkSignUp(event);
      if (valid) {
         SIA.execSignUp(event);  
      }
   }


   async #submitReset(event) {
      console.log('REQUESTED PASSWORD RESET EMAIL!');
      document.getElementById('resetSubmitButton').removeEventListener('click', this.submitResetFunc);
      event.preventDefault();
      const mailInput = event.target.form[0].value;
      const isValidEmail = this.inputChecker.emailRX.test(mailInput);
      if (isValidEmail) {
         const response = await fetch('/PWresetMail', {
                                       method: 'POST',
                                       body: JSON.stringify({email: mailInput}),
                                       headers: {
                                          'Content-Type': 'application/json',
                                       }
                                    }
         );
         if (response.status === 409) {
            this.resetModal.close();
            showInfo('emailNotFound', 'warning');
         } else if (response.status === 502) {
            this.resetModal.close();
            showInfo('emailNotWorking', 'warning');
         } else if (response.status === 201) {
            this.resetModal.close();
            showInfo('resetEmailSent', 'warning');
         }
      } else {
         document.getElementById('invalMailWarn').style.display = 'block';
      }
   }


   #openResetModal(event) {
      event.preventDefault();
      this.resetModal.showModal();
      document.getElementById('invalMailWarn').style.display = 'none';
      document.getElementById('reset-modal-input').value = '';
      document.getElementById('resetSubmitButton').addEventListener('click', this.submitResetFunc);
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