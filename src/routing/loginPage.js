import { navigate } from "./route.js";

function setup() {
   console.log('setup loginPage!');
   // history.pushState('loginPage', "", `/loginPage`);
   console.log('Current state:', history.state);
   }

export { setup };