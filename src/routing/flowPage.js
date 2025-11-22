import FlowpageSurface from "./flowPage_src/flowPageSurface.js";
import BagList from "./flowPage_src/baglist.js";
import FlowList from "./flowPage_src/flowlist.js";
import EventHandler from "./flowPage_src/flowPageEventHandler.js";
import Toolbar from "./toolbar.js";

// for now, DummyData is used instead of fetching bag related folder and transaction content from backend API!


class FlowPage {

   timespan;
   lastFlowCount;

   constructor(dummyData, modal, chart) {
      this.surface = new FlowpageSurface();
      this.dummyData = dummyData;
      this.reloadEvent = new Event('bagReload');  // (?)[../../docs/customEventToolbarTrigger.txt]
      this.toolbar = new Toolbar(dummyData, this.reloadEvent, modal, chart);
      this.baglist = new BagList();
      this.flowlist = new FlowList();
      this.eventHandler = new EventHandler();
      this.chartBags = chart.bags;
   }


   #renderFlowPage(bagName, stepUp=false, toolbarReset=false) {
      // console.log('render');
      this.dummyData.setCurrentBag(bagName, stepUp);
      const bagData = this.dummyData.getData();
      const bagPath = this.dummyData.getBagPath();
      
      const cachedFlowId = this.eventHandler.choosenFlowID;
      this.surface.clear(this.eventHandler);
      
      this.surface.setupProperSurface(bagData, bagPath, (bagName === this.dummyData.revisitFlag), this.timespan);
      
      this.baglist.render(bagData, bagPath);
      this.flowlist.render(bagData, this.timespan);

      if (!((Object.keys(bagData).length === 2) && ('IN' in bagData) && ('OUT' in bagData))) { // --> if not topmost
         
         if (bagName === this.dummyData.revisitFlag) {
            this.toolbar.setupBar();
         }
         
         this.toolbar.currentBagName = bagPath.split('/').pop();
         this.toolbar.handleDirection(bagPath);
         
         if ((this.toolbar.currentType === 'flow') && (document.querySelector(".flowlist").children.length < this.lastFlowCount)) {
            toolbarReset = true;
         }
         
         
         if (toolbarReset) {
            this.toolbar.activateBar('account');
         } else {
            this.toolbar.activateBar(this.toolbar.currentType);
         }
         if (this.toolbar.boundRefreshHandler) {
            document.removeEventListener('bagReload', this.toolbar.boundRefreshHandler);
         }
         this.toolbar.boundRefreshHandler = this.#renderFlowPage.bind(this, this.dummyData.revisitFlag);
         document.addEventListener('bagReload', this.toolbar.boundRefreshHandler);   // (?)[../../docs/customEventToolbarTrigger.txt]
         
         document.querySelector('.dynamicChartButtonText').innerText = (bagPath in this.chartBags) ? 'CHART: REMOVE' : 'ADD TO CHART';
      }
      

      this.#linkBags(bagData, bagPath);
      this.eventHandler.linkFlows(bagData, this.toolbar);
      
      if (cachedFlowId) {
         this.#reselectFlow(cachedFlowId);
      }
      this.lastFlowCount = document.querySelector(".flowlist").children.length;
   }


   #bagClickHandler(nestedBag) {
      this.#renderFlowPage(nestedBag, false, true);
   }


   #linkBags(bagData, bagPath) {
      for (const nestedBag in bagData['nestedBags']) {
         this.eventHandler.boundBagClickHandlers[`${bagPath}/${nestedBag}`] = this.#bagClickHandler.bind(this, nestedBag)
         document.getElementById(`${bagPath}/${nestedBag}`).addEventListener('click', this.eventHandler.boundBagClickHandlers[`${bagPath}/${nestedBag}`]);
      }
   }
   

   #reselectFlow(cachedFlowId) {
      const flowlist = document.querySelector('.flowlist');
      const flowArray = Array.from(flowlist.querySelectorAll('.flowItem'));
      let flowStillHere = false;
      for (const flowItem of flowArray) {
         if (flowItem.dataset.flowId === cachedFlowId) {
            flowStillHere = true;
            flowItem.click();
            this.toolbar.activateBar('flow-change');
         }
      }
      if (!flowStillHere) {
         this.toolbar.activateBar('account');
         // IMPLEMENT POP UP INFO, TELLING THE FLOW DOESN'T APPEAR ANYMORE BECAUSE IT'S NOT IN THE CHOOSEN TIMESPAN ANYMORE!
      }
   }
   
   
   #setupFlowPageLinks(app) {
      document.querySelector('.logo--nav').addEventListener('click', () => app.router.navigate('loggedinHP', ['page--landing']));
      document.getElementById('uparrow-icon-tap-area').addEventListener('click', (e) => {
                                                                            if (!(e.target.dataset.status === 'disabled')) {
                                                                              this.#renderFlowPage('', true, true);
                                                                            }
                                                                        });
      document.getElementById('clock-icon-tap-area').addEventListener('click', () => app.modal.startModal('time')); // OPEN MODAL
      document.getElementById('chart-icon-tap-area').addEventListener('click', () => app.router.navigate('chartPage'));
      document.getElementById('logout-icon-tap-area').addEventListener('click', () => app.router.navigate('loggedoutHP', ['page--landing']));
      document.querySelector('.buzzer--in').addEventListener('click', () => this.#renderFlowPage('IN'));
      document.querySelector('.buzzer--out').addEventListener('click', () => this.#renderFlowPage('OUT'));
   };
   

   setup(app) {
      if (!this.timespan) {
         this.timespan = app.timespan;
      }
      this.#renderFlowPage(this.dummyData.revisitFlag);
      this.#setupFlowPageLinks(app);
      app.makeIconHoverEffect('uparrow');
      app.makeIconHoverEffect('clock');
      app.makeIconHoverEffect('chart');
      app.makeIconHoverEffect('logout');
   }
}

export default FlowPage;