class Toolbar {

   currentType;
   toolbar;

   constructor() {
      this.setupBar();
   }

   setupBar() {
      const flowBag = document.getElementById('flowpage-bag');
      const toolbarFragment = document.getElementById('toolbar').content.cloneNode(true);
      this.toolbar = toolbarFragment.getElementById('toolbar-wrapper');
      flowBag.appendChild(this.toolbar);
   }

   activateBar(bartype) {
      // const bar = document.querySelector(`.menu--${bartype}`);
      if (!this.toolbar) {
         this.setupBar();
         this.activateBar(bartype);
      } else {
         if (this.toolbar.style.display === 'none') {
            this.toolbar.style.display = 'block';
         }
         if (this.currentType && this.currentType !== bartype) {
            this.toolbar.querySelector(`.menu--${this.currentType}`).style.display = 'none';
         }
         this.toolbar.querySelector(`.menu--${bartype}`).style.display = 'flex';
         this.currentType = bartype;
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