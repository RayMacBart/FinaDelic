class TermsPage {

   setup(app) {
      document.querySelector('.loginBackButton').addEventListener('click', () => app.router.navigate('loggedoutHP'), ['page--landing']);
   }
}

export default TermsPage;