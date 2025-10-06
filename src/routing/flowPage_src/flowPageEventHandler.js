class EventHandler {
   BGClick() {
      document.getElementById(id).classList.remove('flowItem--choosen');
      this.choosenFlowID = null;
      document.querySelector('.view-wrapper').removeEventListener('click', this.boundBGClickHandler);
      this.boundBGClickHandler = null;
   }
}

export default EventHandler;