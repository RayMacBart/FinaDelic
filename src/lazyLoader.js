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


const hoverHandler = (e, hover=true) => {
   if (hover) {
      setTimeout(() => {
         e.target.src = `./assets/icons/${e.target.dataset.iconDesc}_hovered.svg`;
      }, 100);
   } else {
      setTimeout(() => {
         e.target.src = `./assets/icons/${e.target.dataset.iconDesc}.svg`;
      }, 180);
   }  
}


const makeIconHoverEffect = (iconName) => {
   const icon = document.querySelector(`#${iconName}-icon`);
   icon.addEventListener('mouseenter', hoverHandler);
   icon.addEventListener('mouseover', hoverHandler);
   icon.addEventListener('mouseleave', e => hoverHandler(e, false));
}


export { getHeroLogo, makeIconHoverEffect };