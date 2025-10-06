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
   boundBagClickHandlers = {};
   boundFlowClickHandler = null;

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
      
      this.surface.clear(this.boundBagClickHandlers, this.boundBGClickHandler, this.boundFlowClickHandler, this.choosenFlowID);

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


   BGClickHandler(flowEl) {
      // BGClick()   --> move below code to it and make proper argument passings. Repeat with other clickHandler methods!
      flowEl.classList.remove('flowItem--choosen');
      if (!(flowEl.classList.contains('flowItem--unchoosen'))) {
         flowEl.classList.add('flowItem--unchoosen');
      }
      this.choosenFlowID = null;
      document.querySelector('.view-wrapper').removeEventListener('click', this.boundBGClickHandler);
      this.boundBGClickHandler = null;
   }

   #bagClickHandler(nestedBag) {
      this.#renderFlowPage(nestedBag);
   }

   #flowClickHandler(event) {
      event.stopPropagation();
      const flowEl = event.target.closest('.flowItem');
      console.log("flowEl:", flowEl);
      if (flowEl) {
         const id = flowEl.dataset.flowId;
         if (!(this.choosenFlowID === id)) {
            if (this.choosenFlowID) {
               document.querySelector('.view-wrapper').removeEventListener('click', this.boundBGClickHandler);
               const flowItems = document.querySelectorAll('.flowItem');
               flowItems.forEach((flowItem) => {
                  if (flowItem.dataset.flowId === this.choosenFlowID) {
                     console.log('flowItem.classList before:', flowItem.classList);
                     flowItem.classList.remove('flowItem--choosen');
                     if (!(flowItem.classList.contains('flowItem--unchoosen'))) {
                        flowItem.classList.add('flowItem--unchoosen');
                     }
                     console.log('flowItem.classList after:', flowItem.classList);
                  }
               })
            }
            console.log('BGClickHandler:', this.BGClickHandler);
            console.log(this);
            this.boundBGClickHandler = this.BGClickHandler.bind(this, flowEl);
            document.querySelector('.view-wrapper').addEventListener('click', this.boundBGClickHandler);
            this.choosenFlowID = id;
            flowEl.classList.remove('flowItem--unchoosen');
            if (!(flowEl.classList.contains('flowItem--choosen'))) {
               flowEl.classList.add('flowItem--choosen')
            }
         } 
      } else {
         console.log('WARNING: TRIED TO ADD FLOW EVENTLISTENER TO NON EXISTING ELEMENT!');
      }
   }


   #setupLinks(bagData, bagPath) {
      for (const nestedBag in bagData['nestedBags']) {
         this.boundBagClickHandlers[`${bagPath}/${nestedBag}`] = this.#bagClickHandler.bind(this, nestedBag)
         document.getElementById(`${bagPath}/${nestedBag}`).addEventListener('click', this.boundBagClickHandlers[`${bagPath}/${nestedBag}`]);
      }
      if (bagData['transactions']) {
         this.boundFlowClickHandler = this.#flowClickHandler.bind(this);
         document.querySelector('.flowlist').addEventListener('click', this.boundFlowClickHandler);
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