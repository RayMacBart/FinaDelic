import renderAmount from './renderAmount.js';

class BagList {

   doStyle2DirAdjust(amount, amountEl, bagItem) {
      if (amount < 0) {
         bagItem.querySelector('.account-badge').src = './assets/fireheader.svg';
         if (amountEl.classList.contains('positive')) {
            amountEl.classList.replace('positive', 'negative');
         }
      }
      else if (amount > 0) {
         bagItem.querySelector('.account-badge').src = './assets/bagheader.svg';
         if (amountEl.classList.contains('negative')) {
            amountEl.classList.replace('negative', 'positive');
         }
      } else {
         bagItem.querySelector('.account-badge').src = './assets/nullheader.svg';
      }
   }

   render(bagData, bagPath) {
      const bagList = document.querySelector('.baglist');
      if (bagData['nestedBags'] && Object.keys(bagData['nestedBags']).length) {
         bagList.classList.remove('baglist--nobag');
         for (const nestedBag in bagData['nestedBags']) {
            const bag = document.querySelector('.bag').content.cloneNode(true);
            const bagItem = bag.querySelector('.bagItem');
            bagItem.id = bagPath + '/' + nestedBag;
            bagItem.querySelector('.bagTitle').innerText = nestedBag.toUpperCase();
            const amountEl = bagItem.querySelector('.account-amount');
            const amount = Number(bagData['nestedBags'][nestedBag]['amount']);
            this.doStyle2DirAdjust(amount, amountEl, bagItem);
            renderAmount(amount, amountEl);
            bagList.appendChild(bagItem);
         }
      } else {
         if (!(bagList.classList.contains('baglist--nobag'))) {
            bagList.classList.add('baglist--nobag');
         }
      }

   }
}

export default BagList;