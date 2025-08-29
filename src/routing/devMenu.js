import { navigate } from "./route.js";


function setup() {
   document.getElementById('HP-loggedout').addEventListener('click', () => navigate('loggedoutHP', ['page--landing']));
   document.getElementById('login-page').addEventListener('click', () => navigate('loginPage'));
   document.getElementById('HP-loggedin').addEventListener('click', () => navigate('loggedinHP', ['page--landing']));
   document.getElementById('flow-page').addEventListener('click', () => navigate('flowPage'));
   document.getElementById('chart-page').addEventListener('click', () => navigate('chartPage'));
   document.getElementById('terms & conditions').addEventListener('click', () => navigate('terms'));
   document.getElementById('legal-notice').addEventListener('click', () => navigate('legal'));
   document.getElementById('privacy-policy').addEventListener('click', () => navigate('privacy'));
}


export { setup };