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

window.onerror = function(message, source, lineno, colno, error) {
   fetch('/client-errorLog', {
                              method: 'POST',
                              headers: {'Content-Type': 'application/json'},
                              body: JSON.stringify({message, source, lineno, colno, stack: error?.stack || null})
   });
};

console.log("TEST LOG");
fetch('/client-errorLog', {
   method: 'POST',
   headers: {'Content-Type': 'application/json'},
   body: JSON.stringify({test: "hello"})
});

const populateExportVariables = (app) => {
   timespan = app.timespan;
   router = app.router;
   chart = app.chart;
}


class App {
   constructor() {
      // console.log('FULL RELOAD!');
      this.timespan = new TimeSpan(this);
      if (localStorage.getItem('timespan')) {
         const timeObj = JSON.parse(localStorage.getItem('timespan'));
         this.timespan.setupTimespan(timeObj);
         this.setAppData();
         this.timespan.fetchTime();
      } else {
         this.timespan.loadFromBackendFirst(this);
      }
   }
   
   setAppData() {   // called in TimeSpan.fetchTime!
      this.appData = new AppData(this);
      if (localStorage.getItem('path')) {
         this.appData.setBagPath(localStorage.getItem('path'));
      }
      if (localStorage.getItem('userdata')) {
         this.appData.data = JSON.parse(localStorage.getItem('userdata'));
         this.appData.setBagAmounts(this.timespan);
         this.continueConstruction1();
         this.appData.fetchUserData(this.timespan);   // no 'await' necessary!
      } else {
         this.appData.loadFromBackendFirst(this);
      }
   }
   
   continueConstruction1() {   // called in AppData.retrieveUserData!
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
                           

                                            