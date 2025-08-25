import { transit } from './switch.js';

function navigate(pagename='devMenu', wantedPageClasses=[]) {
   transit(pagename, wantedPageClasses);
   import(`./${pagename}.js`).then((mod) => {
      mod.setupNewRoutes();
      mod.getRessources();
      });
}

export { navigate };