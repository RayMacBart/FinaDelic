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
      const keyBase64 = document.getElementById('storeKey').textContent;
      const keyU8A = crypting.base64ToUint8Array(keyBase64);
      const keyOBJ = await crypto.subtle.importKey("raw", keyU8A, { name: "AES-GCM" }, false, ["encrypt"]);
      const ivU8A = crypto.getRandomValues(new Uint8Array(12));
      app.appData.setCryptoInfos(keyOBJ, ivU8A);
      const ciphertextBase64 = await crypting.encryptDataToBase64(keyOBJ, ivU8A, updatedDataAndTimeObjString);
      const ivBase64 = crypting.uint8ArrayToBase64(ivU8A);
      const saltBase64 = document.getElementById('storeSalt').textContent;
      const storageItem = JSON.stringify({ciphertext: ciphertextBase64, iv: ivBase64, salt: saltBase64});
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