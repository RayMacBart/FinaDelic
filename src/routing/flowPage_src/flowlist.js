class FlowList {

   render(bagData, bagPath,
      // lastFlowID, setLastFlowID     THIS WILL ONLY BE RELEVANT WHEN CREATING A FLOW!
   ) {
      const flowlistBG = document.querySelector('.flowlist-container-BG');
      const footerMargin = document.querySelector('.footer-margin');
      if (bagData['transactions']) {
         flowlistBG.style.display = 'block';
         if (!(footerMargin.classList.contains('footer-margin--flowlist')));
            footerMargin.classList.add('footer-margin--flowlist');
         for (const transaction in bagData['transactions']) {
            const flow = document.querySelector('.flow').content.cloneNode(true);
            const flowItem = flow.querySelector('.flowItem');
            // flowItem.id = String(lastFlowID++);   THIS WILL ONLY BE RELEVANT WHEN CREATING A FLOW!
            // setLastFlowID(lastFlowID++);          THIS WILL ONLY BE RELEVANT WHEN CREATING A FLOW!
            flowItem.id = transaction;
            flowItem.querySelector('.flowDate').innerText = bagData['transactions'][transaction]['date'];
            flowItem.querySelector('.flow-description').innerText = bagData['transactions'][transaction]['desc'];
            const amount = parseFloat(bagData['transactions'][transaction]['amount']);
            const amountEl = flowItem.querySelector('.flow-amount');
            flowItem.querySelector('.flow-amount').innerText = String(amount);
            if (amount < 0) {
               amountEl.classList.replace('positive', 'negative');
               flowItem.classList.replace('flowItem--in', 'flowItem--out');
            }
            amountEl.innerText = new Intl.NumberFormat('de-DE').format(amount.toFixed(2));
            document.querySelector('.flowlist').appendChild(flowItem);
            const newDiv = document.createElement('div');
            newDiv.style.height = '4rem';
            document.querySelector('.baglist').appendChild(newDiv);
         }
      } else {
         flowlistBG.style.display = 'none';
         footerMargin.classList.remove('footer-margin--flowlist');
      }
   }
}

export default FlowList;