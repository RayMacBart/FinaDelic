class BagList {

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
            const amount = parseFloat(bagData['nestedBags'][nestedBag]['amount']);
            bagItem.querySelector('.account-amount').innerText = String(amount);
            if (amount < 0) {
               bagItem.querySelector('.account-badge').src = './assets/fireheader.svg';
               amountEl.classList.replace('positive', 'negative');
            }
            amountEl.innerText = new Intl.NumberFormat('de-DE').format(amount.toFixed(2));
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