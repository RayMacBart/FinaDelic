const { validationResult } = require('express-validator');
const argon2 = require('argon2');
const User = require('../model/User');
const userCol = require('../model/schemas').Users;
const authStatus = require('../util/authStatus');


exports.signIn = async (req, res) => {
   const user = await userCol.findOne({email: req.body.email});
   if (user) {
      const isRightPW = await argon2.verify(user.pwhash, req.body.password);
      if (isRightPW) {
         // CREATE SESSION COOKIE / AUTHENTICATE
         authStatus.login();
         res.status(303).send();
      } else {
         res.status(403).send();
      }
   } else {
      res.status(403).send();
   }
}


exports.signUp = async (req, res) => {
   const user = await userCol.findOne({email: req.body.email});
   if (user) {
      res.status(409).send();
   } else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         res.status(422).send(errors.array()[0]);
         return;
      }
      const passwordIsValid = true;
      if (passwordIsValid) {
         const PWmatch = (req.body.password === req.body.repeat);
         if (PWmatch) {
            const newUser = await User.create(req.body.email, req.body.password);
            authStatus.login();
            res.status(303).send();
         } else {
            res.status(400).send();
         }
      } else {
         res.status(406).send();
      }
   }
}


exports.logout = async (req, res) => {
   authStatus.logout();
   res.status(303).redirect('/');
}