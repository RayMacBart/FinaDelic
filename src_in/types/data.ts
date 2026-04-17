type flowContentType = {
         'date': string;
         'desc': string;
         'amount': number;
         'currency': string
      };

export type bagContentType = {
   'nestedBags': {
      [key: string]: bagContentType;
   };
   'transactions': {
      [key: number]: flowContentType;
   };
}

export type dataType = {
   'IN': bagContentType;
   'OUT': bagContentType;
};