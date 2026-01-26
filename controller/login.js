const argon2 = require('argon2');
const fs = require('fs').promises;
const path = require('path');
const rootDir = require('../util/rootpath.js');

const userCollection = require('../model/schemas').Users;
const User = require('../model/User.js');

class Login {
   
   static async signIn(req, res) {
      const user = await userCollection.findOne({email: req.body.email});
      if (user) {
         const isRightPW = await argon2.verify(user.pwhash, req.body.password);
         if (isRightPW) {
            // CREATE SESSION COOKIE / AUTHENTICATE
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
         // IMPLEMENT PASSWORD VALIDATION LOGIC HERE!
         const passwordIsValid = true;
         if (passwordIsValid) {
            const PWmatch = (req.body.password === req.body.repeat);
            if (PWmatch) {
               const pwhash = await argon2.hash(req.body.password);
               // IMPLEMENT LOGIC TO AUTHENTICATE USER AND CREATE SESSION COOKIE ETC. HERE!
               const newUser = new userCollection({email: req.body.email, pwhash: pwhash});  // impl. logic in model incl. data & timeconfig!
               await newUser.save();
               res.status(303).send();
            } else {
               res.status(400).send();
            }
         } else {
            res.status(406).send();
         }
      }
   }
}

module.exports = Login;