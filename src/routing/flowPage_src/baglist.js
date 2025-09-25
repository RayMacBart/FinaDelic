class BagList {

   render(bagData) {
      for (const nestedBag in bagData['nestedBags']) {
         const bag = document.querySelector('.bag').content.cloneNode(true);
         const bagItem = bag.querySelector('.bagItem');
         bagItem.id = nestedBag;
         bagItem.querySelector('.bagTitle').innerText = nestedBag.toUpperCase();
         const amount = bagItem.querySelector('.account-amount');
         if (bagData['nestedBags'][nestedBag]['amount'] < 0) {
            bagItem.querySelector('.account-badge').src = './assets/fireheader.svg';
           amount.classList.replace('positive', 'negative');
         }
         amount.innerText = new Intl.NumberFormat('de-DE').format(parseFloat(bagData['nestedBags'][nestedBag]['amount']).toFixed(2));
         document.querySelector('.baglist').appendChild(bagItem);
      }

   }
}

export default BagList;