const checkAuth = (req, res, next) => {
   if (req.session.isLoggedIn) {
      next();
   }
}

module.exports = checkAuth;