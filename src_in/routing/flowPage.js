import FlowPageSurface from "./flowPage_src/flowPageSurface.js";
import BagList from "./flowPage_src/baglist.js";
import FlowList from "./flowPage_src/flowlist.js";
import EventHandler from "./flowPage_src/flowPageEventHandler.js";
import Toolbar from "./flowPage_src/toolbar.js";

// import logg from "./logger.js";

// for now, AppData is used instead of fetching bag related folder and transaction content from backend API!


class FlowPage {

   timespan;
   lastFlowCount;

   constructor(appData, modal, chart) {
      this.surface = new FlowPageSurface();
      this.appData = appData;
      this.reloadEvent = new Event('bagReload');
      this.toolbar = new Toolbar(appData, this.reloadEvent, modal, chart);
      this.baglist = new BagList();
      this.flowlist = new FlowList();
      this.eventHandler = new EventHandler();
      this.chartBags = chart.bags;
   }


   #renderFlowPage(bagName, stepUp=false, toolbarReset=false) {

      // logg({location: '#renderFLowPage start', bagName: bagName});

      // console.log('____________________________');
      // console.log('@ #renderFlowPaqge BEFORE setCurrentBag:');
      // console.log('this.appData.data:');
      // console.log(this.appData.data);
      // console.log('this.appData.getData()');
      // console.log(this.appData.getData());
      
      this.appData.setCurrentBag(bagName, stepUp);
      
      // console.log('@ #renderFlowPaqge AFTER setCurrentBag:');
      // console.log('this.appData.data:');
      // console.log(this.appData.data);
      // console.log('this.appData.getData()');
      // console.log(this.appData.getData());
      // console.log('____________________________');
      const bagData = this.appData.getData();
      const bagPath = this.appData.getBagPath();
      
      // logg({location: '#RFP after bagData & bagPath assignment', bagPath: bagPath, bagData: bagData});

      const cachedFlowId = this.eventHandler.choosenFlowID;
      this.surface.clear(this.eventHandler);
      
      this.surface.setupProperSurface(bagData, bagPath, (bagName === this.appData.revisitFlag), this.timespan);
      
      // logg({location: '#RFP after setupProperSurface'});

      this.baglist.render(bagData, bagPath);
      this.flowlist.render(bagData, this.timespan);

      // logg({location: '#RFP after bag- & flowlist rendering'});

      if (!((Object.keys(bagData).length === 2) && ('IN' in bagData) && ('OUT' in bagData))) { // --> if not topmost

         // if (bagName === this.appData.revisitFlag) {
         if (!(document.getElementById('flowpage-bag').querySelector('#toolbar-wrapper'))) {
            this.toolbar.setupBar();
         }
         
         this.toolbar.currentBagName = bagPath.split('/').pop();
         this.toolbar.handleDirection(bagPath);
         if (((this.toolbar.currentType === 'flow') && (document.querySelector(".flowlist").children.length < this.lastFlowCount)) || 
                                                   (document.querySelector('.menu--account-remove').dataset.removalHappened === 'true')) {
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
         this.toolbar.boundRefreshHandler = this.#renderFlowPage.bind(this, this.appData.revisitFlag);
         document.addEventListener('bagReload', this.toolbar.boundRefreshHandler);   // (?)[../../docs/customEventToolbarTrigger.txt]
         
         if (document.querySelector('.dynamicChartButtonText')) {
            document.querySelector('.dynamicChartButtonText').innerText = (bagPath in this.chartBags) ? 'CHART REMOVE' : 'ADD TO CHART';
         } else {
            alert("WARNING!\nCOULDN'T SET DYNAMIC CHART BUTTON TEXT - BUTTON'S TEXT ELEMENT IS MISSING!");
         }
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

      // logg({location: '#setupFlowPageLinks start'});
      
      document.querySelector('.logo--nav').addEventListener('click', () => app.router.navigate('loggedinHP', ['page--landing']));
      document.getElementById('uparrow-icon-tap-area').addEventListener('click', (e) => {
         if (!(e.target.dataset.status === 'disabled')) {
            this.#renderFlowPage('', true, true);
         }
      });
      document.getElementById('clock-icon-tap-area').addEventListener('click', () => app.modal.startModal('time')); // OPEN MODAL
      document.getElementById('chart-icon-tap-area').addEventListener('click', () => app.router.navigate('chartPage'));
      document.getElementById('logout-icon-tap-area').addEventListener('click', () => window.location.href = '/logout');
      document.querySelector('.buzzer--in').addEventListener('click', () => this.#renderFlowPage('IN'));
      document.querySelector('.buzzer--out').addEventListener('click', () => this.#renderFlowPage('OUT'));

      // logg({location: '#setupFlowPageLinks end'});

   };
   

   setup(app) {
      if (!this.timespan) {
         this.timespan = app.timespan;
      }
      this.#renderFlowPage(this.appData.revisitFlag);
      this.#setupFlowPageLinks(app);
      document.getElementById('username-workspace').innerText = app.appData.username;
      app.makeIconHoverEffect('uparrow');
      app.makeIconHoverEffect('clock');
      app.makeIconHoverEffect('chart');
      app.makeIconHoverEffect('logout');
   }
}

export default FlowPage;