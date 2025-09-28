class Toolbar {

   #currentType;

   constructor() {
      this.setupBar();
   }

   setupBar() {
      const flowBag = document.getElementById('flowpage-bag');
      const toolbar = document.getElementById('toolbar').content.cloneNode(true);
      flowBag.appendChild(toolbar);
   }

   activateBar(bartype) {
      const bar = document.querySelector(`.menu--${bartype}`);
      if (!bar) {
         this.setupBar();
         this.activateBar(bartype);
      } else {
         bar.style.display = 'flex';
         this.#currentType = bartype;
         this.setupButtons(bartype);
      }
   }

   setupButtons(bartype) {
      if (bartype === 'account') {
         // addEventListener
      }
   }
}


export default Toolbar;