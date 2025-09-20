import app from "../index.js";


const setupLoggedoutHPLinks = () => {
   document.getElementById('login-icon-tap-area').addEventListener('click', () => app.navigate('loginPage'));
   document.querySelector('.button--call2action').addEventListener('click', () => app.navigate('loginPage'));
   document.querySelector('.button--enter').addEventListener('click', () => app.navigate('loginPage'));
}

const setup = () => {
   setupLoggedoutHPLinks();
   app.lazyLoader.importSVG('FinaDelic Logo Hero', 'heroLogoBox', ['logo', 'logo--hero']);
   app.makeIconHoverEffect('login');
}

export { setup };