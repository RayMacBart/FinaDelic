import Footer from "./footer.js";
import Router from "./route.js";
import LazyLoader from "./lazyLoader.js";
import TimeSpan from "./timespan.js";
import AppData from "./appData.js";
import Chart from "./chart.js";
import Modal from "./modal.js";
import { modalContents } from "./modalContents.js";
import crypting from "./crypting.js";


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


class App {
   constructor() {
      // console.log('FULL RELOAD!');
      this.timespan = new TimeSpan();
      this.storeID = document.getElementById('storeID').textContent;
      this.appData = new AppData(this.storeID);
      this.lazyLoader = new LazyLoader();
      if (localStorage.getItem(this.storeID)) {
         this.continueWithLocalDataFirst(this.storeID);
      } else {
         this.loadFromBackendFirst(this.storeID);
      }
   }

   async continueWithLocalDataFirst(storeID) {
      const {dataAndTimeObj, decryPath} = await crypting.getDecryptedLocals(storeID);
      this.timespan.setupTimespan(dataAndTimeObj.timeObj);
      this.appData.data = dataAndTimeObj.data;
      this.appData.setBagPath(decryPath);
      this.appData.setBagAmounts(this.timespan);
      this.lazyLoader.loadAndSetFromBackend(this);  // NO 'AWAIT'!
      this.continueConstruction1();
   }
   

   async loadFromBackendFirst(storeID) {
      await this.lazyLoader.loadAndSetFromBackend(this); // 'AWAIT'!
      this.continueConstruction1();
   }

   
   continueConstruction1() {
      this.modal = new Modal(this.appData, modalContents);
      this.chart = new Chart(this);
   }


   continueConstruction2() {
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
                           

                                            