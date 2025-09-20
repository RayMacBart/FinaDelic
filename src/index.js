import Footer from "./footer.js";
import Router from "./route.js";
import LazyLoader from "./lazyLoader.js";

class App {
   constructor(defaultPage) {
      console.log('FULL RELOAD!');
      this.navigate = (new Router(defaultPage)).navigate;
      this.lazyLoader = new LazyLoader();
      new Footer(this.navigate, this.lazyLoader.importSVG);
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
                           

                                            