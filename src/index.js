import Footer from "./footer.js";
import Router from "./route.js";
import LazyLoader from "./lazyLoader.js";
import TimeSpan from "./timespan.js";
import DummyData from "./dummyData.js";
import Chart from "./chart.js";
import Modal from "./modal.js";
import { modalContents } from "./modalContents.js";


class App {
   constructor(defaultPage) {
      console.log('FULL RELOAD!');
      this.timespan = new TimeSpan();
      this.dummyData = new DummyData();
      this.modal = new Modal(this.dummyData, modalContents);
      this.chart = new Chart();
      this.router = new Router(this, defaultPage);
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


const app = new App('flowPage');

export default app;
                           

                                            