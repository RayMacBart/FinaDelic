import Footer from "./footer.js";
import Router from "./route.js";
import LazyLoader from "./lazyLoader.js";


class App {
   constructor() {
      console.log('FULL RELOAD!');
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
                           

                                            