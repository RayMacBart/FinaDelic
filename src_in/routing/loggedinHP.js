
class LoggedinHP {
   #setupLoggedinHPLinks(app) {
      // document.getElementById('logout-icon-tap-area').addEventListener('click', () => app.router.navigate('loggedoutHP', ['page--landing']));
      document.getElementById('logout-icon-tap-area').addEventListener('click', () => window.location.href = '/logout');
      document.querySelector('a').addEventListener('click', (e) => {e.preventDefault(); app.router.navigate('flowPage');});
      document.querySelector('.button--enter').addEventListener('click', () => app.router.navigate('flowPage'));
   }
   
   async setup(app) {
      this.#setupLoggedinHPLinks(app);
      await app.lazyLoader.importSVG('FinaDelic Logo Hero', 'heroLogoBox', ['logo', 'logo--hero']);
      app.makeIconHoverEffect('logout');
   }
}

const page = new LoggedinHP();


export default LoggedinHP;