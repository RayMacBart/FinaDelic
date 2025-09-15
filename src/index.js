import { setupFooter } from "./footer.js";
import { navigate } from "./routing/route.js";

console.log('FULL RELOAD!');

setupFooter();
window.addEventListener('popstate', (e) => {const extraClassesWanted = [];
                                              if (e.state.page === 'loggedoutHP' || e.state.page === 'loggedinHP') {
                                                 extraClassesWanted.push('page--landing');
                                                 }
                                              navigate(window.location.pathname.slice(1), extraClassesWanted, true);
                                              });

if (window.location.pathname === '/') {
   // window.location.href = window.location.origin + '/loggedoutHP';
   window.location.href = window.location.origin + '/flowPage';
}

if ((window.location.pathname === '/loggedoutHP') || (window.location.pathname === '/loggedinHP')) {
   navigate(window.location.pathname.slice(1), ['page--landing']);  // 'loggedoutHP', ['page--landing'] | 'loginPage' | 'loggedinHP', ['page--landing'] |
} else {                                                            // 'flowPage' | 'chartPage' | 'terms' | 'privacy' | 'legal'
   navigate(window.location.pathname.slice(1));
}
                                             

                                            