import renderAmount from './renderAmount.js';
import chronoInsertFlow from './chronoOrder.js';


class FlowList {

   doStyle2DirAdjust(amount, amountEl) {
      if (amount < 0) {
         if (amountEl.classList.contains('positive')) {
            amountEl.classList.replace('positive', 'negative');
            if (amountEl.classList.contains('flowItem--in')) {
               flowItem.classList.replace('flowItem--in', 'flowItem--out');
            } else if (amountEl.classList.contains('flowItem--neutral')) {
               flowItem.classList.replace('flowItem--neutral', 'flowItem--out');
            }
         }
      } else if ((amount > 0) && amountEl.classList.contains('negative')) {
         amountEl.classList.replace('negative', 'positive');
         if (amountEl.classList.contains('flowItem--out')) {
            flowItem.classList.replace('flowItem--out', 'flowItem--in');
         } else if (amountEl.classList.contains('flowItem--neutral')) {
            flowItem.classList.replace('flowItem--neutral', 'flowItem--in');
         }
      } else {
         if (amountEl.classList.contains('flowItem--out')) {
            flowItem.classList.replace('flowItem--out', 'flowItem--neutral');
         } else if (amountEl.classList.contains('flowItem--in')) {
            flowItem.classList.replace('flowItem--in', 'flowItem--neutral');
         }
      }
   }

   render(bagData, timespan) {
      const flowlistBG = document.querySelector('.flowlist-container-BG');
      const footerMargin = document.querySelector('.footer-margin');
      if (bagData['transactions'] && Object.keys(bagData['transactions']).length) {
         
         const orderedFlows = [];
         let flowInPeriodExists = false;
         for (const transaction in bagData['transactions']) {
            const dateArray = bagData['transactions'][transaction]['date'].split('.');
            const formattedDateString = dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0];
            const transDateObj = new Date(formattedDateString);
            if ((timespan.start.getTime() <= transDateObj.getTime()) && (timespan.end.getTime()+86400000 > transDateObj.getTime() )) {  // (?)['../../../../../docs/timespanAddedMS.txt']
               chronoInsertFlow(orderedFlows, transaction, 0, orderedFlows.length, transDateObj);
               if (!flowInPeriodExists) {
                  flowInPeriodExists = true;
               }
            }
         }
         if (flowInPeriodExists) {
            flowlistBG.style.display = 'block';
            if (!(footerMargin.classList.contains('footer-margin--flowlist'))) {
               footerMargin.classList.add('footer-margin--flowlist');
            }
         } else {
            flowlistBG.style.display = 'none';
            footerMargin.classList.remove('footer-margin--flowlist');
         }
         for (const orderedFlow of orderedFlows) {
            const flow = document.querySelector('.flow').content.cloneNode(true);
            const flowItem = flow.querySelector('.flowItem');
            flowItem.dataset.flowId = orderedFlow[0];
            flowItem.querySelector('.flow-date').innerText = bagData['transactions'][orderedFlow[0]]['date'];
            flowItem.querySelector('.flow-description').innerText = bagData['transactions'][orderedFlow[0]]['desc'];
            const amount = Number(bagData['transactions'][orderedFlow[0]]['amount']);
            const amountEl = flowItem.querySelector('.flow-amount');
            this.doStyle2DirAdjust(amount, amountEl);
            renderAmount(amount, amountEl);
            document.querySelector('.flowlist').appendChild(flowItem);
         }
      } else {
         flowlistBG.style.display = 'none';
         footerMargin.classList.remove('footer-margin--flowlist');
      }
   }
}

export default FlowList;