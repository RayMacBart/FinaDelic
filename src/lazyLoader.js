const getHeroLogo = async() => {
   const res = await fetch('./assets/FinaDelic Logo Hero.svg');
   const svg = await res.text();
   const logoBox = document.querySelector('.heroLogoBox');
   logoBox.innerHTML = svg;
   const logo = logoBox.querySelector('svg');
   logo.classList.add('logo', 'logo--hero');
}


const hoverHandler = (e, hover=true) => {
   const imgEl = e.target.previousElementSibling;
   if (hover) {
      setTimeout(() => {
         imgEl.src = `./assets/icons/${imgEl.dataset.iconDesc}_hovered.svg`;
      }, 100);
   } else {
      setTimeout(() => {
         imgEl.src = `./assets/icons/${imgEl.dataset.iconDesc}.svg`;
      }, 180);
   }  
}


const makeIconHoverEffect = (iconName) => {
   const iconTapArea = document.getElementById(`${iconName}-icon-tap-area`);
   iconTapArea.addEventListener('mouseenter', hoverHandler);
   iconTapArea.addEventListener('mouseover', hoverHandler);
   iconTapArea.addEventListener('mouseleave', e => hoverHandler(e, false));
}


export { getHeroLogo, makeIconHoverEffect };