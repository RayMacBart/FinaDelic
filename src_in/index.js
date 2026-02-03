import Footer from "./footer.js";
import Router from "./route.js";
import LazyLoader from "./lazyLoader.js";
import TimeSpan from "./timespan.js";
import AppData from "./appData.js";
import Chart from "./chart.js";
import Modal from "./modal.js";
import { modalContents } from "./modalContents.js";


class App {
   constructor() {
      console.log('FULL RELOAD!');
      this.timespan = new TimeSpan();
      this.appData = new AppData(this.timespan);
      this.modal = new Modal(this.appData, modalContents);
      this.chart = new Chart(this.appData);
      this.router = new Router(this);
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

const timespan = app.timespan;
const router = app.router;
const chart = app.chart;
export { timespan, router, chart };
                           

                                            