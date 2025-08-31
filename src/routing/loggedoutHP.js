import { navigate } from "./route.js";


const getHeroLogo = async() => {
   const res = await fetch('./assets/FinaDelic Logo Hero.svg');
   const svg = await res.text();
   console.log(svg);
   const logoBox = document.querySelector('.heroLogoBox');
   logoBox.innerHTML = svg;
   const logo = logoBox.querySelector('svg');
   logo.classList.add('logo', 'logo--hero');
   logo.addEventListener('click', () => navigate());
}


const getLoginIconHoverEffect = () => {
   const logInIcon = document.querySelector('.icon, .icon--login');
   logInIcon.addEventListener('mouseenter', () => {
      logInIcon.src = './assets/login_hovered.svg';
   })
   logInIcon.addEventListener('mouseover', () => {
      logInIcon.src = './assets/login_hovered.svg';
   })
   logInIcon.addEventListener('mouseleave', () => {
      logInIcon.src = './assets/login.svg';
   })
}


function setup() {
   document.querySelector('.icon--login').addEventListener('click', () => navigate('loginPage'));
   getHeroLogo();
   getLoginIconHoverEffect();
}

export { setup };