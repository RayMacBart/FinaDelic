class LegalPage {

   setup(app) {
      document.querySelector('.loginBackButton').addEventListener('click', () => app.router.navigate('loggedoutHP'), ['page--landing']);
   }
}

export default LegalPage;