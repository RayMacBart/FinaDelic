class DevMenu {
   setup(app) {
      document.getElementById('HP-loggedout').addEventListener('click', () => app.router.navigate('loggedoutHP', ['page--landing']));
      document.getElementById('login-page').addEventListener('click', () => app.router.navigate('loginPage'));
      document.getElementById('HP-loggedin').addEventListener('click', () => app.router.navigate('loggedinHP', ['page--landing']));
      document.getElementById('flow-page').addEventListener('click', () => app.router.navigate('flowPage'));
      document.getElementById('chart-page').addEventListener('click', () => app.router.navigate('chartPage'));
      document.getElementById('terms & conditions').addEventListener('click', () => app.router.navigate('terms'));
      document.getElementById('legal-notice').addEventListener('click', () => app.router.navigate('legal'));
      document.getElementById('privacy-policy').addEventListener('click', () => app.router.navigate('privacy'));
   }
}

export default DevMenu;