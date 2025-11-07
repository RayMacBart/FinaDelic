function chronoInsertFlow(orderedTimes, ID, startIDX, endIDX, dateObj) {  // recursive
   
   if (orderedTimes.length) {
      const midDist = Math.floor((endIDX-startIDX)/2);
      console.log('start:', startIDX, '   end:', endIDX);
      if (dateObj.getTime() > orderedTimes[startIDX+midDist][1]) {
         if (midDist) {
            chronoInsertFlow(orderedTimes, ID, startIDX+midDist, endIDX, dateObj);
         } else {
            orderedTimes.splice(startIDX+1, 0, [ID, dateObj.getTime()]);
         }
      } else if (dateObj.getTime() < orderedTimes[startIDX+midDist][1]) {
         if (midDist) {
            chronoInsertFlow(orderedTimes, ID, startIDX, startIDX+midDist, dateObj);
         } else {
            orderedTimes.splice(startIDX, 0, [ID, dateObj.getTime()]);
         }
      } else {
         orderedTimes.splice(startIDX+1, 0, [ID, dateObj.getTime()]);
      }
   } else {
      orderedTimes.push([ID, dateObj.getTime()]);
   }
}


export default chronoInsertFlow;