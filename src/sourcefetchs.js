function getHeroLogo() {
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
                  });
}

function getFooterLogo() {
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
                  });
}


export { getHeroLogo, getFooterLogo };