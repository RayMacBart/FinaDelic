import { transit } from './switch.js';

function navigate(pageid='devMenu', wantedPageClasses=[], popstate=false) {
   transit(pageid, wantedPageClasses);
   import(`./${pageid}.js`).then((mod) => mod.setup());
   if (!popstate) {
      history.pushState({page: `${pageid}`}, "", `/${pageid}`)
   }
   console.log(history.length);
}

export { navigate };