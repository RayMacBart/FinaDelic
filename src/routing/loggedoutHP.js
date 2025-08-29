import { navigate } from "./route.js";


const getHeroLogo = () => {
   fetch('./assets/FinaDelic Logo Hero.svg')
   .then(res => res.text())
   .then(svg => {
                  const logoBox = document.querySelector('.heroLogoBox');
                  logoBox.innerHTML = svg;
                  return logoBox;
                  })
   .then(logoBox => {
                  const logo = logoBox.querySelector('svg');
                  logo.classList.add('logo', 'logo--hero');
                  return logo;
                  })
   .then(logo => logo.addEventListener('click', () => navigate()));
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