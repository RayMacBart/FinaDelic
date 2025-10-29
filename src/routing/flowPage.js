import FlowpageSurface from "./flowPage_src/flowPageSurface.js";
import BagList from "./flowPage_src/baglist.js";
import FlowList from "./flowPage_src/flowlist.js";
import EventHandler from "./flowPage_src/flowPageEventHandler.js";
import Toolbar from "./toolbar.js";

// for now, DummyData is used instead of fetching bag related folder and transaction content from backend API!


class FlowPage {

   #lastFlowID = 0;

   constructor(dummyData, modal, chart) {
      this.surface = new FlowpageSurface();
      this.dummyData = dummyData;
      this.reloadEvent = new Event('bagReload');  // (?)[../../docs/customEventToolbarTrigger.txt]
      this.toolbar = new Toolbar(dummyData, this.reloadEvent, modal, chart);
      this.baglist = new BagList();
      this.flowlist = new FlowList();
      this.eventHandler = new EventHandler();  
   }


   #renderFlowPage(bagName, stepUp=false, toolbarType='account') {
      console.log('render');
      this.dummyData.setCurrentBag(bagName, stepUp);
      const bagData = this.dummyData.getData();
      const bagPath = this.dummyData.getBagPath();
      
      this.surface.clear(this.eventHandler);
      
      this.surface.setupProperSurface(bagData, bagPath, (bagName === this.dummyData.revisitFlag));

      if (!((Object.keys(bagData).length === 2) && ('IN' in bagData) && ('OUT' in bagData))) { // --> if not topmost

         if (bagName === this.dummyData.revisitFlag) {
            this.toolbar.setupBar();
         }

         this.toolbar.currentBagName = bagPath.split('/').pop();
         this.toolbar.handleDirection(bagPath);
         this.toolbar.activateBar(toolbarType);
         if (this.toolbar.boundRefreshHandler) {
            document.removeEventListener('bagReload', this.toolbar.boundRefreshHandler);
         }
         this.toolbar.boundRefreshHandler = this.#renderFlowPage.bind(this, this.dummyData.revisitFlag, false, this.toolbar.currentType);
         document.addEventListener('bagReload', this.toolbar.boundRefreshHandler);   // (?)[../../docs/customEventToolbarTrigger.txt]
      }
      this.baglist.render(bagData, bagPath);
      this.flowlist.render(bagData, bagPath,
         // this.#lastFlowID, this.setLastFlowID    THIS WILL ONLY BE RELEVANT WHEN CREATING A FLOW!
      ) 
      this.#linkBags(bagData, bagPath);
      this.eventHandler.linkFlows(bagData, this.toolbar);
   }

   // setLastFlowID(newID) {             THIS WILL ONLY BE RELEVANT WHEN CREATING A FLOW!
   //    this.#lastFlowID = newID;
   //    console.log('set new flowID:', this.#lastFlowID);
   // }

   #bagClickHandler(nestedBag) {
      this.#renderFlowPage(nestedBag);
   }


   #linkBags(bagData, bagPath) {
      for (const nestedBag in bagData['nestedBags']) {
         this.eventHandler.boundBagClickHandlers[`${bagPath}/${nestedBag}`] = this.#bagClickHandler.bind(this, nestedBag)
         document.getElementById(`${bagPath}/${nestedBag}`).addEventListener('click', this.eventHandler.boundBagClickHandlers[`${bagPath}/${nestedBag}`]);
      }
   }


   #setTimeHeader(timespan) {
      document.getElementById('time-start').innerText = timespan.start.getDate()+'.'+(timespan.start.getMonth()+1)+'.'+timespan.start.getFullYear();
      document.getElementById('time-end').innerText = timespan.end.getDate()+'.'+(timespan.end.getMonth()+1)+'.'+timespan.end.getFullYear();
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
      this.#setTimeHeader(app.timespan);
      this.#setupFlowPageLinks(app);
      app.makeIconHoverEffect('uparrow');
      app.makeIconHoverEffect('clock');
      app.makeIconHoverEffect('chart');
      app.makeIconHoverEffect('logout');
   }
}

export default FlowPage;