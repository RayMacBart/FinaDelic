import crypting from "./crypting.js";


class LazyLoader {


   constructor() {
      this.parser = new DOMParser();
   }


   loadAndSetFromBackend = async (app) => {
      const dataResponse = await fetch('/userdata');
      const fetchedData = await dataResponse.json(); // gets into dataAndTimeObj -> will be part of encrypted ciphertext!
      const timeResponse = await fetch('/time');
      const fetchedTimeObj = await timeResponse.json(); // gets into dataAndTimeObj -> will be part of encrypted ciphertext!
      const updatedDataAndTimeObj = {data: fetchedData, timeObj: fetchedTimeObj};
      const updatedDataAndTimeObjString = JSON.stringify(updatedDataAndTimeObj);
      const ciphertextBase64 = await crypting.encryptDataToBase64(app.appData.keyOBJ, app.appData.ivU8A, updatedDataAndTimeObjString);
      const ivBase64 = crypting.uint8ArrayToBase64(app.appData.ivU8A);
      console.log('setting local salt:', app.localSaltB64);
      const storageItem = JSON.stringify({ciphertext: ciphertextBase64, iv: ivBase64, salt: app.localSaltB64});
      localStorage.setItem(app.storeID, storageItem);
      app.timespan.setupTimespan(fetchedTimeObj);
      app.appData.data = fetchedData;
      app.appData.setBagAmounts(app.timespan);
   }
   

   importSVG = async(svgFilename, wrapperCSSclass, ownCSSclasses) => {
      const res = await fetch(`/assets/${svgFilename}.svg`);
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
         imgEl.src = `/assets/icons/${imgEl.dataset.iconDesc}_disabled.svg`;
      } else {
         if (hover) {
            setTimeout(() => {
               imgEl.src = `/assets/icons/${imgEl.dataset.iconDesc}_hovered.svg`;
            }, 100);
         } else {
            setTimeout(() => {
               imgEl.src = `/assets/icons/${imgEl.dataset.iconDesc}.svg`;
            }, 180);
         }  
      }
   }
}

export default LazyLoader;