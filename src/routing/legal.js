class LegalPage {

   setup(app) {
      document.querySelector('.loginBackButton').addEventListener('click', () => history.back());
   }
}

export default LegalPage;