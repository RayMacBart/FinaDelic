import FlowpageSurface from "./flowPage_src/flowPageSurface.js";
import BagList from "./flowPage_src/baglist.js";
import FlowList from "./flowPage_src/flowlist.js";
import EventHandler from "./flowPage_src/flowPageEventHandler.js";
import Toolbar from "./toolbar.js";
import DummyData from "../dummyData.js";
// for now, DummyData is used instead of fetching bag related folder and transaction content from backend API!

class FlowPage {

   #lastFlowID = 0;
   choosenFlowID = null;
   boundBGClickHandler = null;
   boundClickHandlers = {};

   constructor() {
      this.surface = new FlowpageSurface();
      this.toolbar = new Toolbar();
      this.dummyData = new DummyData();
      this.baglist = new BagList();
      this.flowlist = new FlowList();
      this.eventHandler = new EventHandler();
   }

   #renderFlowPage(bagName, stepUp=false) {

      this.dummyData.setCurrentBag(bagName, stepUp);
      const bagData = this.dummyData.getData();
      const bagPath = this.dummyData.getBagPath();
      
      this.surface.clear(this.boundClickHandlers);
      if (this.choosenFlowID) {
         document.querySelector('.view-wrapper').removeEventListener('click', this.boundBGClickHandler);
         this.choosenFlowID = null;
         this.boundBGClickHandler = null;
      }

      this.surface.setupProperSurface(bagData, bagPath, (bagName === this.dummyData.revisitFlag));
   
      if (!((Object.keys(bagData).length === 2) && ('IN' in bagData) && ('OUT'in bagData))) { // --> if not topmost
         if (bagName === this.dummyData.revisitFlag) {
            this.toolbar.setupBar();
         }
         this.toolbar.activateBar('account');
      }
      
      this.baglist.render(bagData, bagPath);
      this.flowlist.render(bagData, bagPath,
         // this.#lastFlowID, this.setLastFlowID    THIS WILL ONLY BE RELEVANT WHEN CREATING A FLOW!
      ) 
      this.#setupLinks(bagData, bagPath);
   }

   // setLastFlowID(newID) {             THIS WILL ONLY BE RELEVANT WHEN CREATING A FLOW!
   //    this.#lastFlowID = newID;
   //    console.log('set new flowID:', this.#lastFlowID);
   // }


   #BGClickHandler(id) {
      // BGClick()   --> move below code to it and make proper argument passings. Repeat with other clickHandler methods!
      document.getElementById(id).classList.remove('flowItem--choosen');
      this.choosenFlowID = null;
      document.querySelector('.view-wrapper').removeEventListener('click', this.boundBGClickHandler);
      this.boundBGClickHandler = null;
   }

   #bagClickHandler(nestedBag, event) {
      event.stopPropagation();
      this.#renderFlowPage(nestedBag);
   }

   #flowClickHandler(id, bagPath, event) {
      event.stopPropagation();
      if (!(this.choosenFlowID === id)) {
         if (this.choosenFlowID) {
            document.querySelector('.view-wrapper').removeEventListener('click', this.boundBGClickHandler);
            document.getElementById(this.choosenFlowID).classList.remove('flowItem--choosen');
         }
         this.boundBGClickHandler = this.#BGClickHandler.bind(this, id);
         document.querySelector('.view-wrapper').addEventListener('click', this.boundBGClickHandler);
         this.choosenFlowID = id;
         const flowEl = document.getElementById(id);
         if (flowEl) {
            if (!(flowEl.classList.contains('flowItem--choosen'))) {
               flowEl.classList.add('flowItem--choosen')
            }
         } else {
            console.log('WARNING: TRIED TO ADD FLOW EVENTLISTENER TO NON EXISTING ELEMENT!');
         }
      }
   }



   #setupLinks(bagData, bagPath) {
      for (const nestedBag in bagData['nestedBags']) {
         this.boundClickHandlers[`${bagPath}/${nestedBag}`] = this.#bagClickHandler.bind(this, nestedBag)
         document.getElementById(`${bagPath}/${nestedBag}`).addEventListener('click', this.boundClickHandlers[`${bagPath}/${nestedBag}`]);
      }
      if (bagData['transactions']) {
         for (const id in bagData['transactions']) {
            this.boundClickHandlers[id] = this.#flowClickHandler.bind(this, id, bagPath);
            document.getElementById(id).addEventListener('click', this.boundClickHandlers[id]);
         }
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