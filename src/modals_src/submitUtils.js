class SubmitUtils {

   bagPath;
   
   constructor(dummyData) {
      this.dummyData = dummyData;
   }

   getParentObj(currentBagName, fullObject=false) {
      const pathArray = this.bagPath.split('/');
      let focussedObj;
      if ((pathArray.length === 2) && (fullObject)) {
         focussedObj = this.dummyData.data[pathArray[0]];
      } else {
         focussedObj = this.dummyData.data[pathArray[0]]['nestedBags'];
         for (const bag of pathArray) {
            if ((bag === 'IN' || bag === 'OUT')) {
               continue;
            }
            if (fullObject) {
               if (bag !== pathArray[pathArray.length-2]) {
                  focussedObj = focussedObj[bag]['nestedBags'];
               } else {
                  focussedObj = focussedObj[bag];
                  break;
               }
            } else {
               if (bag !== currentBagName) {
                  focussedObj = focussedObj[bag]['nestedBags'];
               }
            }
         }
      }
      return focussedObj;
   }
   
   
   getAll1DirBagObjects(parentObj, parentName) {  // recursive
      let collection = {};
      collection[parentName] = parentObj;
      if (parentObj['nestedBags']) {
         for (const bagName in parentObj['nestedBags']) {
            collection = {...collection, ...this.getAll1DirBagObjects(parentObj['nestedBags'][bagName], parentName+'/'+bagName)};
         }
      }
      return collection;
   }

   
   getBagObjByPath(bagPath, obj=this.dummyData.data[bagPath.split('/')[0]]) {  // recursive
      if (bagPath.includes('/')) {
         const pathArray = bagPath.split('/');
         pathArray.shift();
         const nextPathPart = pathArray.join('/');
         return this.getBagObjByPath(nextPathPart, obj['nestedBags'][pathArray.shift()]);
      } else {
         return obj;
      }
   }
}


export default SubmitUtils;