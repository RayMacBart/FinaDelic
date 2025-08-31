import { transit } from './switch.js';

async function navigate(pageid='devMenu', wantedPageClasses=[], popstate=false) {
   transit(pageid, wantedPageClasses);
   const mod = await import(`./${pageid}.js`);
   mod.setup();
   if (!popstate) {
      history.pushState({page: `${pageid}`}, "", `/${pageid}`)
   }
}

export { navigate };