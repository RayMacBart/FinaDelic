class LegalPage {

   setup(app) {
      document.querySelector('.loginBackButton').addEventListener('click', () => app.router.navigate('loggedinHP'), ['page--landing']);
   }
}

export default LegalPage;