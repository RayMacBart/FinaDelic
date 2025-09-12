import { navigate } from "./route.js";
import { makeIconHoverEffect } from "../lazyLoader.js";

const setupFlowPageLinks = () => {
   document.getElementById('logout-icon-tap-area').addEventListener('click', () => navigate('loggedoutHP', ['page--landing']));
};

function setup() {
   setupFlowPageLinks();
   makeIconHoverEffect('uparrow');
   makeIconHoverEffect('clock');
   makeIconHoverEffect('chart');
   makeIconHoverEffect('logout');
}

export { setup };