
class Router {

   pages = {}

   constructor(app) {
      let frontpath = window.location.pathname;
      this.app = app;
      window.addEventListener('popstate', (e) => {
                                             const extraClassesWanted = [];
                                             // let appPath = window.location.pathname;
                                             // console.log('window.location.pathname:', window.location.pathname);
                                             // console.log('document.pathname:', document.pathname);
                                             // if (appPath === '/') {
                                             //    appPath = '/loggedinHP';
                                             // } else if (appPath === '/workspace') {
                                             //    appPath = '/flowPage';
                                             // } else if (appPath === '/chart') {
                                             //    appPath = '/chartPage';
                                             // }
                                             // console.log('appPath:', appPath);
                                             // console.log('e.state.page:', e.state.page);
                                             if (e.state.page === 'loggedinHP') {
                                                extraClassesWanted.push('page--landing');
                                             }
                                             //  this.navigate(window.location.pathname.slice(1), extraClassesWanted, true);
                                              this.navigate(e.state.page, extraClassesWanted, true);
                                             // this.navigate(appPath.slice(1), extraClassesWanted, true);
                                             });
      if (frontpath === '/in/' || frontpath === '/') {
         this.navigate('loggedinHP', ['page--landing']); 
      } else {
         let wantedpage;
         const routeinfoEl = document.getElementById('routeinfo');
         if (routeinfoEl) {
            wantedpage = routeinfoEl.textContent;
            routeinfoEl.remove();
         } else {
            wantedpage = frontpath;
         }
         this.navigate(wantedpage.slice(1));
      }
   }

// 'loggedinHP', ['page--landing'] | 'flowPage' | 'chartPage' | 'terms' | 'privacy' | 'legal'


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

   navigate = async(pageid, wantedPageClasses=[], popstate=false) => {
      this.#transit(pageid, wantedPageClasses);
      
      if (!(pageid in this.pages)) {
         const Module = await import(`./routing/${pageid}.js`);
         const newInst = new Module.default(this.app.appData, this.app.modal, this.app.chart);
         this.pages[pageid] = newInst;
      }
      let urlname = pageid;
      if (['flowPage', 'chartPage'].includes(urlname)) {
         urlname = urlname === 'flowPage' ? 'workspace' : 'chart';
      } else if (urlname === 'profilePage') {
         urlname = 'profile';
      }
      // if (!popstate) {
      if (pageid === 'loggedinHP') {
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