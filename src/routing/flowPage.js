import { navigate } from "./route.js";
import { makeIconHoverEffect } from "../lazyLoader.js";
import { DummyData } from "../dummyData.js";
// for now, DummyData is used instead of fetching bag related folder and transaction content from backend API!

const renderFlowBag = (bagName, stepUp=false) => {
   DummyData.setCurrentBag(bagName, stepUp);
   const bag = DummyData.getData();

   console.log(bagName);
   for (const key in bag) {
      console.log(key);
   }

   if ((Object.keys(bag).length === 2) && ('IN' in bag) && ('OUT')in bag) {
      document.getElementById('flow-bag').style.display = 'none';
      document.getElementById('flow-top').style.display = 'block';
   } else {
      if (bagName === 'IN' || bagName === 'OUT') { // means 50% chance user came from topmost (at least)
         document.getElementById('flow-top').style.display = 'none';
         document.getElementById('flow-bag').style.display = 'block';
      }
      const titleBG = document.querySelector('.flowBagTitleBG');
      if (bag.amount >= 0) {
         titleBG.classList.remove('flowBagTitleBG--fire');
         titleBG.classList.add('flowBagTitleBG--bag');
      } else {
         titleBG.classList.remove('flowBagTitleBG--bag');
         titleBG.classList.add('flowBagTitleBG--fire');
      }
   }
}

const setupFlowPageLinks = () => {
   document.querySelector('.logo--nav').addEventListener('click', () => navigate('loggedinHP', ['page--landing']));
   document.getElementById('uparrow-icon-tap-area').addEventListener('click', () => renderFlowBag('', true));
   // document.getElementById('clock-icon-tap-area').addEventListener('click', () => ??????????); // OPEN MODAL
   document.getElementById('chart-icon-tap-area').addEventListener('click', () => navigate('chartPage'));
   document.getElementById('logout-icon-tap-area').addEventListener('click', () => navigate('loggedoutHP', ['page--landing']));
   document.querySelector('.buzzer--in').addEventListener('click', () => renderFlowBag('IN'));
   document.querySelector('.buzzer--out').addEventListener('click', () => renderFlowBag('OUT'));
};

function setup() {
   setupFlowPageLinks();
   makeIconHoverEffect('uparrow');
   makeIconHoverEffect('clock');
   makeIconHoverEffect('chart');
   makeIconHoverEffect('logout');
}

export { setup };