class BagList {

   render(bagData, bagPath) {
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
         document.querySelector('.baglist').appendChild(bagItem);
      }

   }
}

export default BagList;