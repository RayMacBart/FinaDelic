class PrivacyPage {

   setup(app) {
      document.querySelector('.loginBackButton').addEventListener('click', () => app.router.navigate('loggedinHP'), ['page--landing']);
   }
}

export default PrivacyPage;