class LazyLoader {

   constructor() {
      this.parser = new DOMParser();
   }
   
   importSVG = async(svgFilename, wrapperCSSclass, ownCSSclasses) => {  // (?)[../docs/methodAsProperty.txt]
      const res = await fetch(`./assets/${svgFilename}.svg`);
      const svgText = await res.text();
      const svg = this.parser.parseFromString(svgText, 'image/svg+xml').documentElement;
      const clonedSVG = svg.cloneNode(true);
      const logoBox = document.querySelector('.'+wrapperCSSclass);
      for (const cls of ownCSSclasses) {
         clonedSVG.classList.add(cls);
      }
      logoBox.appendChild(clonedSVG);
      return clonedSVG;
   }

   hoverPicLoader(e, hover=true) {
      const imgEl = e.target.previousElementSibling;
      if (e.target.dataset.status === 'disabled') {
         imgEl.src = `./assets/icons/${imgEl.dataset.iconDesc}_disabled.svg`;
      } else {
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
   }
}

export default LazyLoader;