import { transit } from './switch.js';

async function navigate(pageid='devMenu', wantedPageClasses=[], popstate=false) {
   transit(pageid, wantedPageClasses);
   const module = await import(`./${pageid}.js`);
   module.setup();
   if (!popstate) {
      history.pushState({page: `${pageid}`}, "", `/${pageid}`)
   }
}

export { navigate };