// --> THIS IS A DUMMY AUTHENTICATION HELPER (REPLACED BY REAL AUTH!)

class AuthStatus {

   constructor(authenticated) {
      this.authenticated = authenticated;
   }

   logout() {
      this.authenticated = false;
   }

   login() {
      this.authenticated = true;
   }

   check(req) {
      return this.authenticated; 
   }
}

const authStatus = new AuthStatus(false);

module.exports = authStatus;