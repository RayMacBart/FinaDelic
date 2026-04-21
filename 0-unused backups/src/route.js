
class Router {

   pages = {}

   constructor(app) {
      let frontpath = window.location.pathname;
      this.app = app;
      window.addEventListener('popstate', (e) => {const extraClassesWanted = [];
         console.log('e.state:', e.state);
                                              if (e.state.page === 'loggedoutHP' || e.state.page === 'loggedinHP') {
                                                 extraClassesWanted.push('page--landing');
                                                 }
                                              this.navigate(window.location.pathname.slice(1), extraClassesWanted, true);
                                              });
      const defaultPage = 'loggedinHP';
      if (frontpath === '/') {
         frontpath = '/' + defaultPage;
         // implement somehow, that '/' leads to loggedoutHP, and only to loggedinHP if session is active!
      }
      if (['/loggedoutHP', '/loggedinHP', '/loginPage', '/flowPage', '/chartPage', '/legal', '/terms', '/privacy'].includes(frontpath)) {
         // REPLACE '/loggedoutHP' & '/loggedinHP' with '/', when above is implemented!
         if (['/loggedoutHP', '/loggedinHP', '/loginPage'].includes(frontpath)) {
            // REPLACE '/loggedoutHP' & '/loggedinHP' with '/', when above is implemented!
            // REDIRECT LOGINPAGE TO LOGGEDINHP, if session is running!
            // For this redirection, create routepath-variable, replace frontpath.slice(1) below.
            this.navigate(frontpath.slice(1), ['page--landing']);                                                              
         } else if (['/flowPage', '/chartPage'].includes(frontpath)) {
            this.navigate('flowPage');    
            // HERE, REDIRECT CHARTPAGE TO FLOWPAGE 
         } else { // legal, privacy & terms                                                   
            this.navigate(defaultPage);
            // HERE, REDIRECT all of them to loggedoutHP, or to loggedinHP if the session is running.
         }
      } else {
         alert('404 - Page Not Found!');
         // IMPLEMENT 404 page!
      }
   }

   // --> IN THE BACKEND, LOGGEDINHP, LOGGEDOUTHP, LOGINPAGE, FLOWPAGE AND 404PAGE HAVE TO BE SINGLE FAST-FETCH READY!

// 'loggedoutHP', ['page--landing'] | 'loginPage' | 'loggedinHP', ['page--landing'] |
// 'flowPage' | 'chartPage' | 'terms' | 'privacy' | 'legal'


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

   navigate = async(pageid='loggedinHP', wantedPageClasses=[], popstate=false) => {  // (?)[../docs/methodAsProperty.txt]
      this.#transit(pageid, wantedPageClasses);
      if (!(pageid in this.pages)) {
         const Module = await import(`./routing/${pageid}.js`);
         const newInst = new Module.default(this.app.dummyData, this.app.modal, this.app.chart);
         this.pages[pageid] = newInst;
      }
      if (!popstate) {
         history.pushState({page: `${pageid}`}, "", `/${pageid}`)
      }
      this.pages[pageid].setup(this.app);
   }
}


export default Router;