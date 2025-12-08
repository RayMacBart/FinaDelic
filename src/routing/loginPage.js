class LoginPage {


   #signIn(event) {
      event.preventDefault();
      // this.#validateEmail(.....)  // --> Argument: Zugriff auf value des input feldes?
   }


   #signUp(event) {
      event.preventDefault();
   }


   #setupLoginPageLinks(app) {
      document.querySelector('.loginBackButton').addEventListener('click', () => app.router.navigate('loggedoutHP', ['page--landing']));
      document.getElementById('sign-in-submit-button').addEventListener('click', this.#signIn);
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
      document.getElementById('sign-in-submit-button').addEventListener('click', this.#signUp);
   }

   async setup(app) {
      this.#setupLoginPageLinks(app);
      await app.lazyLoader.importSVG('FinaDelic Logo Hero', 'heroLogoBox', ['logo', 'logo--hero']);
   }
}

export default LoginPage;