import { navigate } from "./routing/route.js";

const getFooterLogo = () => {
   fetch('./assets/FinaDelic Logo Footer.svg')
   .then(res => res.text())
   .then(svg => {
                  const logoBox = document.querySelector('.footerLogoBox');
                  logoBox.innerHTML = svg;
                  return logoBox;
                  })
   .then(logoBox => {
                  const logo = logoBox.querySelector('svg');
                  logo.classList.add('logo', 'logo--footer');
                  return logo;
                  })
   .then(logo => logo.addEventListener('click', () => navigate()));
}

const setupFooterlinks = () => {
   document.querySelector('menu :nth-child(1) > a').addEventListener('click', (e) => {e.preventDefault(); navigate('terms');});
   document.querySelector('menu :nth-child(2) > a').addEventListener('click', (e) => {e.preventDefault(); navigate('privacy');});
   document.querySelector('menu :nth-child(3) > a').addEventListener('click', (e) => {e.preventDefault(); navigate('legal');});
}

function setupFooter() {
   getFooterLogo();
   setupFooterlinks();
}

export { setupFooter };