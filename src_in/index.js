import Footer from "./footer.js";
import Router from "./route.js";
import LazyLoader from "./lazyLoader.js";
import TimeSpan from "./timespan.js";
import AppData from "./appData.js";
import Chart from "./chart.js";
import Modal from "./modal.js";
import { modalContents } from "./modalContents.js";


let timespan;
let router;
let chart;


const populateExportVariables = (app) => {
   timespan = app.timespan;
   router = app.router;
   chart = app.chart;
}


class App {
   constructor() {
      console.log('FULL RELOAD!');
      this.timespan = new TimeSpan(this);
   }
   
   setAppData() {   // called in TimeSpan.fetchTime!
      this.appData = new AppData(this);
   }
   
   continueConstruction1() {   // called in AppData.fetchUserData!
      this.modal = new Modal(this.appData, modalContents);
      this.chart = new Chart(this);
   }

   continueConstruction2() {
      this.router = new Router(this);
      populateExportVariables(this);
      this.lazyLoader = new LazyLoader();
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
                           

                                            