
class Router {

   pages = {}

   constructor(app) {
      let frontpath = window.location.pathname;
      this.app = app;
      window.addEventListener('popstate', (e) => {const extraClassesWanted = [];
         console.log('e.state:', e.state);
                                              if (e.state.page === 'loggedoutHP') {
                                                 extraClassesWanted.push('page--landing');
                                                 }
                                              this.navigate(window.location.pathname.slice(1), extraClassesWanted, true);
                                              });

      if (frontpath === '/') {
         this.navigate('loggedoutHP', ['page--landing']); 
      } else {
         this.navigate(frontpath.slice(1));
      }
   }

// 'loggedoutHP', ['page--landing'] | 'loginPage' | 'terms' | 'privacy' | 'legal'


   #updatePageClasses(wanted, current) {
      const toDel = [];
      let cls;
      for (cls of current) {
         if (!(wanted.includes(cls)) && !(cls === 'page')) {
            toDel.push(cls);
         }
      }
      for (cls of toDel) {
         current.remove(cls);
      }
      for (cls of wanted) {
         if (!current.contains(cls)) {
            current.add(cls);
         }
      }
   }

   #transit(id, wantedPageClasses) {
      const pageContainer = document.querySelector('.page');
      const page = document.getElementById(id).content.cloneNode(true);
      this.#updatePageClasses(wantedPageClasses, pageContainer.classList)
      pageContainer.replaceChildren(page);
      scrollTo(0, 0);
   }

   navigate = async(pageid, wantedPageClasses=[], popstate=false) => {  // (?)[../docs/methodAsProperty.txt]
      this.#transit(pageid, wantedPageClasses);
      if (!(pageid in this.pages)) {
         const Module = await import(`./routing/${pageid}.js`);
         const newInst = new Module.default(this.app.dummyData, this.app.modal, this.app.chart);
         this.pages[pageid] = newInst;
      }
      if (!popstate) {
         if (pageid === 'loggedoutHP') {
            history.pushState({page: `${pageid}`}, "", '/');
         }
         else {
            history.pushState({page: `${pageid}`}, "", `/${pageid}`);
         }
      }
      this.pages[pageid].setup(this.app);
   }
}


export default Router;