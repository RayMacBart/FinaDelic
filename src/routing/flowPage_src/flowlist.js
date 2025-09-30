class FlowList {

   render(bagData, bagPath,
      // lastFlowID, setLastFlowID     THIS WILL ONLY BE RELEVANT WHEN CREATING A FLOW!
   ) {
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
      }

   }
}

export default FlowList;