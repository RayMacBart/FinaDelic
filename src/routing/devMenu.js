import app from "../index.js";


function setup() {
   document.getElementById('HP-loggedout').addEventListener('click', () => app.navigate('loggedoutHP', ['page--landing']));
   document.getElementById('login-page').addEventListener('click', () => app.navigate('loginPage'));
   document.getElementById('HP-loggedin').addEventListener('click', () => app.navigate('loggedinHP', ['page--landing']));
   document.getElementById('flow-page').addEventListener('click', () => app.navigate('flowPage'));
   document.getElementById('chart-page').addEventListener('click', () => app.navigate('chartPage'));
   document.getElementById('terms & conditions').addEventListener('click', () => app.navigate('terms'));
   document.getElementById('legal-notice').addEventListener('click', () => app.navigate('legal'));
   document.getElementById('privacy-policy').addEventListener('click', () => app.navigate('privacy'));
}


export { setup };