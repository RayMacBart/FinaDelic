
class Router {

   pages = {}

   constructor(app, defaultPage) {
      this.app = app;
      window.addEventListener('popstate', (e) => {const extraClassesWanted = [];
         console.log(e);
                                              if (e.state.page === 'loggedoutHP' || e.state.page === 'loggedinHP') {
                                                 extraClassesWanted.push('page--landing');
                                                 }
                                              this.navigate(window.location.pathname.slice(1), extraClassesWanted, true);
                                              });
      if (window.location.pathname === '/') {
         window.location.href = window.location.origin + '/' + defaultPage;
      }
      if ((window.location.pathname === '/loggedoutHP') || (window.location.pathname === '/loggedinHP')) {
         this.navigate(window.location.pathname.slice(1), ['page--landing']);  // 'loggedoutHP', ['page--landing'] | 'loginPage' | 'loggedinHP', ['page--landing'] |
      } else {                                                            // 'flowPage' | 'chartPage' | 'terms' | 'privacy' | 'legal'
         this.navigate(window.location.pathname.slice(1));
      }
   }

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

   navigate = async(pageid='devMenu', wantedPageClasses=[], popstate=false) => {  // (?)[../docs/methodAsProperty.txt]
      this.#transit(pageid, wantedPageClasses);
      if (!(pageid in this.pages)) {
         const Module = await import(`./routing/${pageid}.js`);
         const newInst = new Module.default();
         this.pages[pageid] = newInst;
      }
      this.pages[pageid].setup(this.app);
      if (!popstate) {
         history.pushState({page: `${pageid}`}, "", `/${pageid}`)
      }
   }
}


export default Router;