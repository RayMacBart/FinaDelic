import { navigate } from "./route.js";
import { getHeroLogo, makeIconHoverEffect } from "../lazyLoader.js";

const setupLoggedinHPLinks = () => {
   document.getElementById('logout-icon-tap-area').addEventListener('click', () => navigate('loggedoutHP', ['page--landing']));
   document.querySelector('a').addEventListener('click', (e) => {e.preventDefault(); navigate('flowPage');});
   document.querySelector('.button--enter').addEventListener('click', () => navigate('flowPage'));
}

const setup = () => {
   setupLoggedinHPLinks();
   getHeroLogo();
   makeIconHoverEffect('logout');
}

export { setup };