
class LoggedoutHP {
   #setupLoggedoutHPLinks(app) {
      document.getElementById('login-icon-tap-area').addEventListener('click', () => app.router.navigate('loginPage'));
      document.querySelector('.button--call2action').addEventListener('click', () => app.router.navigate('loginPage'));
      document.querySelector('.button--enter').addEventListener('click', () => app.router.navigate('loginPage'));
   }
   
   async setup(app) {
      this.#setupLoggedoutHPLinks(app);
      await app.lazyLoader.importSVG('FinaDelic Logo Hero', 'heroLogoBox', ['logo', 'logo--hero']);
      app.makeIconHoverEffect('login');
   }
}


export default LoggedoutHP;