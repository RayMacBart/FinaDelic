import logg from "../logger.js";

function renderAmount(amount, amountEl) {
   logg({location: 'in renderAmount start!', amount: amount, amountEl: amountEl});
   const formattedAmount = new Intl.NumberFormat('de-DE').format(amount.toFixed(2));
   const amountArray = String(formattedAmount).split(',');
   if (amountArray.length === 2) {
      if ((Number(amountArray[1]) > 0) && (Number(amountArray[1]) < 10) && (amountArray[1].length === 1)) {
         amountArray[1] = amountArray[1]+'0';
      }
      amountEl.innerText = amountArray[0]+','+amountArray[1];
   } else {
      amountEl.innerText = amountArray[0];
   }
}

export default renderAmount;