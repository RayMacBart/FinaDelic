


class ProfilePage {

   setup(app: object) {
      (document.querySelector('.loginBackButton') as HTMLDivElement).addEventListener('click', () => app.router.navigate('loggedinHP'), ['page--landing']);
   }
}