import { navigate } from "./route.js";
import { makeIconHoverEffect } from "../lazyLoader.js";
import { DummyData } from "../dummyData.js";
// for now, DummyData is used instead of fetching bag related folder and transaction content from backend API!

const renderFlowBag = (bagName, stepUp=false) => {
   DummyData.setCurrentBag(bagName, stepUp);
   const bag = DummyData.getData();
   console.log(bag);
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