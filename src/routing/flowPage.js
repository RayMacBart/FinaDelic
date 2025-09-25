import FlowpageSurface from "./flowPage_src/flowPageSurface.js";
import BagList from "./flowPage_src/baglist.js";
import Toolbar from "./toolbar.js";
import DummyData from "../dummyData.js";
// for now, DummyData is used instead of fetching bag related folder and transaction content from backend API!

class FlowPage {

   constructor() {
      this.surface = new FlowpageSurface();
      this.toolbar = new Toolbar();
      this.dummyData = new DummyData();
      this.baglist = new BagList();
   }

   #renderFlowPage(bagName, stepUp=false) {

      this.dummyData.setCurrentBag(bagName, stepUp);
      const bagData = this.dummyData.getData();
   
      // console.log('bagDataName:\n', bagName, '\nkeys:');
      // for (const key in bag) {
      //    console.log(key);
      // }
      
      this.surface.clear();
      this.surface.setupProperSurface(bagData, bagName, (bagName === this.dummyData.revisitFlag));
   
      if (!((Object.keys(bagData).length === 2) && ('IN' in bagData) && ('OUT'in bagData))) { // --> if not topmost
         if (bagName === this.dummyData.revisitFlag) {
            this.toolbar.setupBar();
         }
         this.toolbar.activateBar('account');
      }
      
      this.baglist.render(bagData);
      this.#setupBagListLinks(bagData);
   }

   #setupBagListLinks(bagData) {
      for (const nestedBag in bagData['nestedBags']) {
         document.getElementById(`${nestedBag}`).addEventListener('click', () => this.#renderFlowPage(nestedBag));
      }
   }
   
   #setupFlowPageLinks(app) {
      document.querySelector('.logo--nav').addEventListener('click', () => app.router.navigate('loggedinHP', ['page--landing']));
      document.getElementById('uparrow-icon-tap-area').addEventListener('click', (e) => {
                                                                            if (!(e.target.dataset.status === 'disabled')) {
                                                                              this.#renderFlowPage('', true);
                                                                            }
                                                                        });
      // document.getElementById('clock-icon-tap-area').addEventListener('click', () => ??????????); // OPEN MODAL
      document.getElementById('chart-icon-tap-area').addEventListener('click', () => app.router.navigate('chartPage'));
      document.getElementById('logout-icon-tap-area').addEventListener('click', () => app.router.navigate('loggedoutHP', ['page--landing']));
      document.querySelector('.buzzer--in').addEventListener('click', () => this.#renderFlowPage('IN'));
      document.querySelector('.buzzer--out').addEventListener('click', () => this.#renderFlowPage('OUT'));
   };
   
   setup(app) {
      this.#renderFlowPage(this.dummyData.revisitFlag);
      this.#setupFlowPageLinks(app);
      app.makeIconHoverEffect('uparrow');
      app.makeIconHoverEffect('clock');
      app.makeIconHoverEffect('chart');
      app.makeIconHoverEffect('logout');
   }
}

export default FlowPage;