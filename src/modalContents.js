const modalContents = {
      'bag-create': {
         'text-1': 'CREATE NEW BAG',  // always replace the word 'BAG' with the dynamic words 'Pocket' or 'Drain' by creating a brandnew span!!  
         'input-label': 'Enter Name', // If doing so, don't forget to set innerHTML of all modal's text elements to "" after everything is done!
         'input': true,
         'submit-button': 'CREATE',
         'cancel-button': 'CANCEL'
      },
      'bag-rename': {
         'text-1': 'old name:',
         'text-2': 'BAG',
         'input-label': 'Enter new name:',
         'input': true,
         'submit-button': 'RENAME',
         'cancel-button': 'CANCEL'
      },
      'flow-amount': {
         'input-label': 'Enter Amount:',
         'input': true,
         'submit-button': 'OK',
         'cancel-button': 'CANCEL'
      },
      'flow-desc': {
         'input-label': 'Enter Description:',
         'input': true,
         'submit-button': 'OK',
         'cancel-button': 'CANCEL'
      },
      'flow-date': {
         'input-label': 'Enter Date:',
         'input': true,    // type='date'  !!!
         'submit-button': 'OK',
         'cancel-button': 'CANCEL'
      },

   }

   export { modalContents };