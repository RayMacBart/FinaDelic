


class ProfilePage {

   constructor(appData, modal, chart) {
      this.modal = modal;
   }

   #delAccountAction() {
      this.modal.reloadEvent = new Event('mockEvent');
      this.modal.startModal('confirmAccDel');
   } 

   setup(app) {
      document.getElementById('username-profile').innerText = app.appData.username;
      (document.querySelector('.loginBackButton')).addEventListener('click', () => app.router.navigate('loggedinHP'), ['page--landing']);
      document.getElementById('deleteLink').addEventListener('click', () => this.#delAccountAction());
   }
}

export default ProfilePage;