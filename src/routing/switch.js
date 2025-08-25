function updatePageClasses(wanted, current) {
   const toDel = [];
   let cls;
   for (cls of current) {
      if (!(wanted.includes(cls)) && !(cls === 'page')) {
         toDel.push(cls);
      }
   }
   for (cls of toDel) {
      current.remove(cls);
   }
   for (cls of wanted) {
      if (!current.contains(cls)) {
         current.add(cls);
      }
   }
}


function transit(id, wantedPageClasses) {
   const pageContainer = document.querySelector('.page');
   const page = document.getElementById(id).content.cloneNode(true);
   updatePageClasses(wantedPageClasses, pageContainer.classList)
   pageContainer.replaceChildren(page);
}

export { transit };