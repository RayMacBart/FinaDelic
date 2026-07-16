import Footer from "./footer.js";
import Router from "./route.js";
import LazyLoader from "./lazyLoader.js";
import TimeSpan from "./timespan.js";
import AppData from "./appData.js";
import Chart from "./chart.js";
import Modal from "./modal.js";
import { modalContents } from "./modalContents.js";
import crypting from "./crypting.js";
import fetchDerivedKeyBase64 from "./backendDataCommunication/keyDerivationPoster.js";


let timespan;
let router;
let chart;

const csrfMeta = document.querySelector('meta[name="csrf-token"]');
const CSRFToken = csrfMeta ? csrfMeta.content : null;


const populateExportVariables = (app) => {
   timespan = app.timespan;
   router = app.router;
   chart = app.chart;
}


const fetchStoreID = async () => {
   const response = await fetch('/storeID');
   const respObj = await response.json();
   return respObj['storeID'];
}


class App {
   constructor() {
      // console.log('FULL RELOAD!');
      this.loadFromServerFirst = false;
      this.timespan = new TimeSpan();
      crypting.timespan = this.timespan;
      this.storeID = null;
      this.localSaltB64 = null;
      if (document.getElementById('storeID')) {
         this.storeID = document.getElementById('storeID').textContent;
      } else {
         this.loadFromServerFirst = true;
      }
      this.appData = new AppData();
      crypting.appData = this.appData;
      this.setupDataCryptoParams();
   }


   async setupDataCryptoParams() {
      if (this.storeID && localStorage.getItem(this.storeID)) {
         const storeObj = JSON.parse(localStorage.getItem(this.storeID));
         this.localSaltB64 = storeObj.salt;
      } else if (document.getElementById('storeSalt')) {
         this.localSaltB64 = document.getElementById('storeSalt').textContent;
      } else {
         const saltU8A = new Uint8Array(16);
         crypto.getRandomValues(saltU8A);
         this.localSaltB64 = crypting.uint8ArrayToBase64(saltU8A);
      }
      if (this.loadFromServerFirst) {
         this.storeID = await fetchStoreID();
      }
      this.appData.storeID = this.storeID;
      let keyBase64;
      if (document.getElementById('storeKey')) {
         keyBase64 = document.getElementById('storeKey').textContent;
      } else {
         keyBase64 = await fetchDerivedKeyBase64(this.localSaltB64);
      }
      const keyU8A = crypting.base64ToUint8Array(keyBase64);
      const keyOBJ = await crypto.subtle.importKey("raw", keyU8A, { name: "AES-GCM" }, false, ["encrypt"]);
      const ivU8A = crypto.getRandomValues(new Uint8Array(12));
      await this.appData.setCryptoInfos(keyOBJ, ivU8A, this.localSaltB64);
      this.manageDataLoad();
   }

   manageDataLoad() {
      this.lazyLoader = new LazyLoader();
      if ((!(this.loadFromServerFirst)) && localStorage.getItem(this.storeID)) {
         this.continueWithLocalDataFirst(this.storeID);
      } else {
         this.loadFromServerFirst = true;
         this.loadFromBackendFirst();
      }
   }

   async continueWithLocalDataFirst(storeID) {
      const {dataAndTimeObj, decryPath} = await crypting.getDecryptedLocals(storeID);
      this.timespan.setupTimespan(dataAndTimeObj.timeObj);
      this.appData.data = dataAndTimeObj.data;
      this.appData.setBagPath(decryPath);
      this.appData.setBagAmounts(this.timespan);
      this.chart = new Chart(this);
      this.modal = new Modal(this.appData, modalContents, this.chart);
      this.lazyLoader.loadAndSetFromBackend(this);  // NO 'AWAIT'!
      this.continueConstruction();
   }
   

   async loadFromBackendFirst() {
      await this.lazyLoader.loadAndSetFromBackend(this); // 'AWAIT'!
      this.continueConstruction();
   }


   continueConstruction() {
      if (this.loadFromServerFirst) {
         this.chart = new Chart(this);
         this.modal = new Modal(this.appData, modalContents, this.chart);
      }
      this.router = new Router(this);
      populateExportVariables(this);
      new Footer(this.router.navigate, this.lazyLoader.importSVG);
   }


   makeIconHoverEffect(iconName) {
      const iconTapArea = document.getElementById(`${iconName}-icon-tap-area`);
      iconTapArea.addEventListener('mouseenter', this.lazyLoader.hoverPicLoader);
      iconTapArea.addEventListener('mouseover', this.lazyLoader.hoverPicLoader);
      iconTapArea.addEventListener('mouseleave', e => this.lazyLoader.hoverPicLoader(e, false));
   }

}


const app = new App();


export { timespan, router, chart };
                           

                                            