import FlowpageSurface from "./flowPage_src/flowPageSurface.js";
import BagList from "./flowPage_src/baglist.js";
import FlowList from "./flowPage_src/flowlist.js";
import Toolbar from "./toolbar.js";
import DummyData from "../dummyData.js";
// for now, DummyData is used instead of fetching bag related folder and transaction content from backend API!

class FlowPage {

   #lastFlowID = 0;

   constructor() {
      this.surface = new FlowpageSurface();
      this.toolbar = new Toolbar();
      this.dummyData = new DummyData();
      this.baglist = new BagList();
      this.flowlist = new FlowList();
   }

   #renderFlowPage(bagName, stepUp=false) {

      this.dummyData.setCurrentBag(bagName, stepUp);
      const bagData = this.dummyData.getData();
      const bagPath = this.dummyData.getBagPath();
      
      this.surface.clear(this.boundBagClickHandlers);
      console.log("baglist.children after clear():", document.querySelector('.baglist').children);

      this.surface.setupProperSurface(bagData, bagPath, (bagName === this.dummyData.revisitFlag));
   
      if (!((Object.keys(bagData).length === 2) && ('IN' in bagData) && ('OUT'in bagData))) { // --> if not topmost
         if (bagName === this.dummyData.revisitFlag) {
            this.toolbar.setupBar();
         }
         this.toolbar.activateBar('account');
      }
      
      this.baglist.render(bagData, bagPath);
      this.#setupBagListLinks(bagData, bagPath);
      this.flowlist.render(bagData, bagPath,
         // this.#lastFlowID, this.setLastFlowID    THIS WILL ONLY BE RELEVANT WHEN CREATING A FLOW!
      )
   }

   // setLastFlowID(newID) {             THIS WILL ONLY BE RELEVANT WHEN CREATING A FLOW!
   //    this.#lastFlowID = newID;
   //    console.log('set new flowID:', this.#lastFlowID);
   // }

   #bagClickHandler(nestedBag) {
      console.log('°°° nestedBag in bagClickHandler:', nestedBag);
      this.#renderFlowPage(nestedBag);
   }

   boundBagClickHandlers = {};

   #setupBagListLinks(bagData, bagPath) {
      for (const nestedBag in bagData['nestedBags']) {
         this.boundBagClickHandlers[`${bagPath}/${nestedBag}`] = this.#bagClickHandler.bind(this, nestedBag)
         document.getElementById(`${bagPath}/${nestedBag}`).addEventListener('click', this.boundBagClickHandlers[`${bagPath}/${nestedBag}`]);
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