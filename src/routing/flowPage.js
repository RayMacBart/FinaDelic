import app from "../index.js";
import { setupProperFlowpageSurface } from "./flowPageFunctions.js";
import { DummyData } from "../dummyData.js";
// for now, DummyData is used instead of fetching bag related folder and transaction content from backend API!

const renderFlowBag = (bagName, stepUp=false) => {
   DummyData.setCurrentBag(bagName, stepUp);
   const bag = DummyData.getData();

   console.log('bagName:\n', bagName, '\nkeys:');
   for (const key in bag) {
      console.log(key);
   }

   setupProperFlowpageSurface(bag, bagName, (bagName === DummyData.revisitFlag));

   if (!((Object.keys(bag).length === 2) && ('IN' in bag) && ('OUT'in bag))) { // --> if not topmost
      const flowBag = document.getElementById('flow-bag');
      const toolbar = document.getElementById('toolbar').content.cloneNode(true);
      flowBag.appendChild(toolbar);

   }
   
}

const setupFlowPageLinks = () => {
   document.querySelector('.logo--nav').addEventListener('click', () => app.navigate('loggedinHP', ['page--landing']));
   document.getElementById('uparrow-icon-tap-area').addEventListener('click', (e) => {
                                                                         if (!(e.target.dataset.status === 'disabled')) {
                                                                           renderFlowBag('', true);
                                                                         }
                                                                     });
   // document.getElementById('clock-icon-tap-area').addEventListener('click', () => ??????????); // OPEN MODAL
   document.getElementById('chart-icon-tap-area').addEventListener('click', () => app.navigate('chartPage'));
   document.getElementById('logout-icon-tap-area').addEventListener('click', () => app.navigate('loggedoutHP', ['page--landing']));
   document.querySelector('.buzzer--in').addEventListener('click', () => renderFlowBag('IN'));
   document.querySelector('.buzzer--out').addEventListener('click', () => renderFlowBag('OUT'));
};

function setup() {
   renderFlowBag(DummyData.revisitFlag);
   setupFlowPageLinks();
   app.makeIconHoverEffect('uparrow');
   app.makeIconHoverEffect('clock');
   app.makeIconHoverEffect('chart');
   app.makeIconHoverEffect('logout');
}

export { setup };