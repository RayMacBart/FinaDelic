import { setupFooter } from "./footer.js";
import { navigate } from "./routing/route.js";

console.log('FULL RELOAD!');

setupFooter();
window.addEventListener('popstate', (e) => {const extraClassesWanted = [];
                                              console.log('HEY!');
                                              if (e.state.page === 'loggedoutHP' || e.state.page === 'loggedinHP') {
                                                 extraClassesWanted.push('page--landing');
                                                 }
                                              navigate(window.location.pathname.slice(1), extraClassesWanted, true);
                                              });
// document.addEventListener('popstate', (e) => console.log('HEY!'));
// window.onpopstate = (e) => {
//   console.log('HEY!', e.state);
// };
if (window.location.pathname === '/') {
   window.location.href = window.location.origin + '/loggedoutHP';
}

if ((window.location.pathname === '/loggedoutHP') || (window.location.pathname === '/loggedinHP')) {
   navigate(window.location.pathname.slice(1), ['page--landing']);  // 'loggedoutHP', ['page--landing'] | 'loginPage' | 'loggedinHP', ['page--landing'] |
} else {
   navigate(window.location.pathname.slice(1));
}
                                             // 'flowPage' | 'chartPage' | 'terms' | 'privacy' | 'legal'

                                            