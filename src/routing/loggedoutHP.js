import { navigate } from "./route.js";
import { getHeroLogo, makeIconHoverEffect } from "../lazyLoader.js";


const setupLoggedoutHPLinks = () => {
   document.getElementById('login-icon-tap-area').addEventListener('click', () => navigate('loginPage'));
   document.querySelector('.button--call2action').addEventListener('click', () => navigate('loginPage'));
   document.querySelector('.button--enter').addEventListener('click', () => navigate('loginPage'));
}

const setup = () => {
   setupLoggedoutHPLinks();
   getHeroLogo();
   makeIconHoverEffect('login');
}

export { setup };