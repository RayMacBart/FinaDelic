const argon2 = require('argon2');
const { validationResult } = require('express-validator');
const userCollection = require('./schemas').Users;
const Data = require('./Data');
const authStatus = require('../util/authStatus');


class User {

   static async #create(email, password) {
      const pwhash = await argon2.hash(password);
      // IMPLEMENT LOGIC TO AUTHENTICATE USER AND CREATE SESSION COOKIE ETC. HERE!
      const data = await Data.create();
      const now = new Date();
      const startdate = now.getFullYear()+'-01-01';
      const enddate = now.toISOString().split('T')[0];
      const newUserDoc = new userCollection({email: email,
                                             pwhash: pwhash,
                                             data: data,
                                             timeconfig: { 
                                                startdate: startdate,
                                                enddate: enddate
                                             }});
      return await newUserDoc.save();
   }


   static async signIn(req, res) {
      const user = await userCollection.findOne({email: req.body.email});
      if (user) {
         const isRightPW = await argon2.verify(user.pwhash, req.body.password);
         if (isRightPW) {
            // CREATE SESSION COOKIE / AUTHENTICATE
            authStatus.login();
            res.status(303).send();
         } else {
            res.status(403).send();
         }
      }
   }


   static async signUp(req, res) {
      const user = await userCollection.findOne({email: req.body.email});
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
               const newUser = await User.#create(req.body.email, req.body.password);
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


   static logout(req, res) {
      authStatus.logout();
      res.status(303).redirect('/');
   }
}

module.exports = User;