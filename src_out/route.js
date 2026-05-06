

class Router {

   pages = {}

   constructor(app) {
      let frontpath = window.location.pathname;
      this.app = app;
      window.addEventListener('popstate', (e) => {
                                             const extraClassesWanted = [];
                                             let appPath = window.location.pathname;
                                             if (appPath === '/') {
                                                appPath = '/loggedoutHP';
                                             } else if (appPath === '/login') {
                                                appPath = '/loginPage';
                                             }
                                             if (e.state.page === 'loggedoutHP') {
                                                extraClassesWanted.push('page--landing');
                                             }
                                             this.navigate(appPath.slice(1), extraClassesWanted, true);
                                             // this.navigate(e.state.page, extraClassesWanted, true);
                                             });

      if (frontpath === '/' || frontpath === '/out') {
         this.navigate('loggedoutHP', ['page--landing']); 
      } else {
         let wantedpage = frontpath;
         const routeinfoEl = document.getElementById('routeinfo');
         if (routeinfoEl) {
            wantedpage = routeinfoEl.textContent
         }
         routeinfoEl.remove();
         this.navigate(wantedpage.slice(1));
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
         const Module = await import(`./routing/${pageid}`);
         const newInst = new Module.default();
         this.pages[pageid] = newInst;
      }
      const urlname = pageid === 'loginPage' ? 'login' : pageid;
      // if (!popstate) {
      if (pageid === 'loggedoutHP') {
         history.pushState({page: `${pageid}`}, "", '/');
      }
      else {
         history.pushState({page: `${pageid}`}, "", `/${urlname}`);
      }
      // }
      this.pages[pageid].setup(this.app);
   }
}


export default Router;