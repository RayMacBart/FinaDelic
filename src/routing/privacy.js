class PrivacyPage {

   setup(app) {
      document.querySelector('.loginBackButton').addEventListener('click', () => history.back());
   }
}

export default PrivacyPage;