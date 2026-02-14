class CustomValidator {

   static checkText(text) {
      let hasError = false;
      
      if (hasError) {
         throw new Error("Sent wrong shaped 'Create Bag Body Object' (misses 'name' or 'path')!");
      }
   }
}

module.exports = CustomValidator;