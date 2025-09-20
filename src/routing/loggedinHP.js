import app from "../index.js";


const setupLoggedinHPLinks = () => {
   document.getElementById('logout-icon-tap-area').addEventListener('click', () => app.navigate('loggedoutHP', ['page--landing']));
   document.querySelector('a').addEventListener('click', (e) => {e.preventDefault(); app.navigate('flowPage');});
   document.querySelector('.button--enter').addEventListener('click', () => app.navigate('flowPage'));
}

const setup = () => {
   setupLoggedinHPLinks();
   app.lazyLoader.importSVG('FinaDelic Logo Hero', 'heroLogoBox', ['logo', 'logo--hero']);
   app.makeIconHoverEffect('logout');
}

export { setup };