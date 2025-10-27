const modalContents = {
      'add2chart': {
         'text-1': 'Are you sure you want to add',
         'text-2': 'BAG',  // shall be replaced with bag's name!
         'text-3': 'to the current chart?',
         'submit-button': 'YES',
         'cancel-button': 'NO'
      },
      'bag-create': {
         'text-1': 'CREATE NEW BAG',
         'input-label': 'Enter Name',
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
      'bag-erase': {
         'text-1': 'Are you sure you want to delete',
         'text-2': 'BAG',
         'text-3': 'and also all the content inside',
         'questionmark': '?',
         'submit-button': 'YES',
         'cancel-button': 'NO'
      },
      'bag-disband': {
         'text-1': 'Are you sure you want to delete',
         'text-2': 'BAG',
         'text-3': 'and move all it\'s content up to',
         'text-4': 'PARENTBAG',
         'questionmark': '?',
         'submit-button': 'YES',
         'cancel-button': 'NO'
      },
      'bag-move': {
         'text-1': 'MOVE',
         'text-2': 'BAG', // shall be replaced with bag's name!
         'select-label': 'Choose destination bag:',
         'select': true,
         'submit-button': 'MOVE',
         'cancel-button': 'CANCEL'
      },
      'flow-delete': {
         'text-1': 'Are you sure you want to delete the selected flow',
         'questionmark': '?',
         'submit-button': 'YES',
         'cancel-button': 'NO'
      },
      'flow-amount': {
         'text-1': 'Enter Amount:',
         'amount-input-wrapper': true,
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
      'flow-move': {
         'text-1': 'MOVE FLOW',
         'select-label': 'Choose destination bag:',
         'select': true,
         'submit-button': 'MOVE',
         'cancel-button': 'CANCEL'
      },
   }

   export { modalContents };