class Infos {

   constructor() {
      this.infoTexts = {
      'invalidTimespan': 'The specified start date is later than the end date. Hence the end date was automatically set to be equal to the start date.',
      'added2chart': 'The current bag was added to the chart.',
      'removedFromChart': 'The current bag was removed from the chart!',
      'flowNotInPeriod': "The date of the affected Flow is not within the selected time period - hence it doesn't appear.",
      'duplicate': "Duplicate name: the Box already contains that entry.",
      'invalidLogin': 'Incorrect email or password.',
      'allEmpty': 'Please enter your email and password.',
      'emptyEmail': 'Please enter your email address.',
      'emptyPW': 'Please enter your password.',
      'invalidEmail': 'Invalid email.',
      'missRepeat': "Please repeat your password.",
      'repeatMismatch': "Your password entries don’t match. Please try again.",
      'password': "Your password does not meet the following requirements:\n",
      'badChars': 'Your password contains special characters which are not allowed. \nPlease only use one of the following characters: \n § @ . # $ ! % * ? & ',
      'checkBoxes': 'You must agree to the Terms & Conditions and confirm the Privacy Policy to continue.',
      'taken': 'This email address is already registered!',
      'emailSent': 'We sent you an verification email.\nPlease check your mailbox.',
      'ValErr1': 'Invalid input in the field: ',
      'ValErr2': "The server couldn't accept what you entered there.\nPlease try again and enter something different in this field.",
      'DataStore1': 'ATTENTION!\nfailed to synchronize the ',
      'DataStore2': ' with the server database!',
      'invalidData1': 'WARNING!\n\nThe server received invalid data during following process:\n\n',
      'invalidData2': "\n\nHence it didn't update the database accordingly!",
      'nameCollisionError1': "During the following operation:\n\n",
      'nameCollisionError2': "\n\n... a name collision occurred.\nThe boxname is already taken.\nPlease try another one."
      // 'noSpecialChars': 'Beside normal letters, digits and spaces, only  ? ! . , / ) (  are allowed!'
      }
   }
   

   showInfo(infoTitle, infoType='neutral', listing=null, field='') {
      const box = document.createElement('div');
      const text = document.createElement('p');
      box.appendChild(text);
      if (field) {
         if (infoTitle === 'ValidationError') {
            text.innerText = this.infoTexts['ValErr1']+field+this.infoTexts['ValErr2'];
         } else if (infoTitle === 'dataStorageError') {
            text.innerText = this.infoTexts['DataStore1']+field+this.infoTexts['DataStore2'];
         } else if (infoTitle === 'invalidData') {
            text.innerText = this.infoTexts['invalidData1']+field+this.infoTexts['invalidData2'];
         } else if (infoTitle === 'nameCollisionError') {
            text.innerText = this.infoTexts[infoTitle+'1']+field+this.infoTexts[infoTitle+'2'];
         }
      } else {
         text.innerText = this.infoTexts[infoTitle];
      }
      if (listing) {
         let newText = text.innerText;
         for (const item of listing) {
            newText = ` ${newText}\n --> ${item}`;
         }
         text.innerText = newText;
      }
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
      const duranceValue = text.innerText.length <= 43 ? 60 : 40
      setTimeout(() => {
         viewWrapper.removeChild(box);
      }, text.innerText.length*duranceValue);
   }
}

const infos = new Infos();
const showInfo = infos.showInfo.bind(infos);

export { showInfo };