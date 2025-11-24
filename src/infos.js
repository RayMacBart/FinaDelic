class Infos {

   constructor() {
      this.infoTexts = {
      'invalidTimespan': 'The specified start date is later than the end date. Hence the end date was automatically set to be equal to the start date.',
      'added2chart': 'The current bag was added to the chart.',
      'removedFromChart': 'The current bag was removed from the chart!'
      }
   }
   

   showInfo(infoTitle, infoType='neutral') {
      const box = document.createElement('div');
      const text = document.createElement('p');
      box.appendChild(text);
      text.innerText = this.infoTexts[infoTitle];
      const viewWrapper = document.querySelector('.view-wrapper');
      viewWrapper.appendChild(box);
      box.classList.add('infobox');
      text.classList.add('infotext');
      if (infoType === 'warning') {
         box.classList.add('infobox--warning');
         text.classList.add('infotext--warning');
      } else if (infoType === 'neutral') {
         box.classList.add('infobox--neutral');
         text.classList.add('infotext--neutral');
      }

      // console.log('textlength:', text.innerText.length);
      
      setTimeout(() => {
         viewWrapper.removeChild(box);
      }, text.innerText.length*40);
   }
}

const infos = new Infos();
const showInfo = infos.showInfo.bind(infos);

export { showInfo };