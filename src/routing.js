function setupRoutingMenu() {
   const page_container = document.querySelector('.page');

   const HP_loggedout_link = document.getElementById('HP-loggedout');
   const login_page_link = document.getElementById('login-page');
   const HP_loggedin_link = document.getElementById('HP-loggedin');
   const flowpage_link = document.getElementById('flowpage');
   const chartpage_link = document.getElementById('chartpage');
   const terms_link = document.getElementById('terms');
   const legalnotice_link = document.getElementById('legal-notice');
   const privacypolicy_link = document.getElementById('privacy-policy');
   const modals_link = document.getElementById('modals');
   const taskbars_link = document.getElementById('taskbars');

   HP_loggedout_link.addEventListener('click', () => {
      console.log('clicked!');
      const loggedout_hp = document.getElementById('logged-out_HP').content.cloneNode(true);
      page_container.classList.add('page--landing');
      page_container.replaceChildren(loggedout_hp);
      import('./sourcefetchs.js').then((module) => module.getHeroLogo());
      import('./UIeffects.js').then((module) => module.listen4effects());
   })
   login_page_link.addEventListener('click', () => {});
   HP_loggedin_link.addEventListener('click', () => {});
   flowpage_link.addEventListener('click', () => {});
   chartpage_link.addEventListener('click', () => {});
   terms_link.addEventListener('click', () => {});
   legalnotice_link.addEventListener('click', () => {});
   privacypolicy_link.addEventListener('click', () => {});
   modals_link.addEventListener('click', () => {});
   taskbars_link.addEventListener('click', () => {});
}

export { setupRoutingMenu };