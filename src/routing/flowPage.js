import FlowpageSurface from "./flowPageSurface.js";
import Toolbar from "./toolbar.js";
import DummyData from "../dummyData.js";
// for now, DummyData is used instead of fetching bag related folder and transaction content from backend API!

class FlowPage {

   constructor() {
      this.surface = new FlowpageSurface();
      this.toolbar = new Toolbar();
      this.dummyData = new DummyData();
   }

   #renderFlowBag(bagName, stepUp=false) {
      this.dummyData.setCurrentBag(bagName, stepUp);
      const bag = this.dummyData.getData();
      console.log('bag received from getData():\n', bag);
   
      // console.log('bagName:\n', bagName, '\nkeys:');
      // for (const key in bag) {
      //    console.log(key);
      // }
   
      this.surface.setupProperSurface(bag, bagName, (bagName === this.dummyData.revisitFlag));
   
      if (!((Object.keys(bag).length === 2) && ('IN' in bag) && ('OUT'in bag))) { // --> if not topmost
         this.toolbar.activateBar('account');
      }
      
   }
   
   #setupFlowPageLinks(app) {
      document.querySelector('.logo--nav').addEventListener('click', () => app.router.navigate('loggedinHP', ['page--landing']));
      document.getElementById('uparrow-icon-tap-area').addEventListener('click', (e) => {
                                                                            if (!(e.target.dataset.status === 'disabled')) {
                                                                              this.#renderFlowBag('', true);
                                                                            }
                                                                        });
      // document.getElementById('clock-icon-tap-area').addEventListener('click', () => ??????????); // OPEN MODAL
      document.getElementById('chart-icon-tap-area').addEventListener('click', () => app.router.navigate('chartPage'));
      document.getElementById('logout-icon-tap-area').addEventListener('click', () => app.router.navigate('loggedoutHP', ['page--landing']));
      document.querySelector('.buzzer--in').addEventListener('click', () => this.#renderFlowBag('IN'));
      document.querySelector('.buzzer--out').addEventListener('click', () => this.#renderFlowBag('OUT'));
   };
   
   setup(app) {
      this.#renderFlowBag(this.dummyData.revisitFlag);
      this.#setupFlowPageLinks(app);
      app.makeIconHoverEffect('uparrow');
      app.makeIconHoverEffect('clock');
      app.makeIconHoverEffect('chart');
      app.makeIconHoverEffect('logout');
   }
}

export default FlowPage;