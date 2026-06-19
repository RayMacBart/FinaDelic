const { validationResult } = require('express-validator');
const argon2 = require('argon2');
const User = require('../model/User');
const userCol = require('../model/schemas').Users;
const tokenCol = require('../model/schemas').Tokens;
const crypto = require('crypto');
const cry = require('../crypt');
const brevoAPIinstance = require('../brevoAPIinstance');
const verificationMail = require('../mailContents').verificationEmail;
const fs = require("fs");
const path = require("path");



exports.postSignIn = async (req, res) => {
   const hashedEmail = await crypto.createHash("sha256").update(req.body.email).digest("base64");
   const user = await userCol.findOne({emailHash: hashedEmail});
   if (user) {
      const isRightPW = await argon2.verify(user.pwhash, req.body.password);
      if (isRightPW) {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            res.status(422).send(errors.array()[0]);
            return;
         }
         req.session.userId = user._id;
         req.session.isLoggedIn = true;
         res.status(303).send();
      } else {
         res.status(403).send();
      }
   } else {
      res.status(403).send();
   }
}


exports.postSignUp = async (req, res) => {
   const hashedEmail = await crypto.createHash("sha256").update(req.body.email).digest("base64");
   const user = await userCol.findOne({emailHash: hashedEmail});
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
            try {
               // await transporter.verify(); DOESN'T WORK WITH BREVO
               const mailToken = await crypto.randomBytes(32).toString('hex');
               const mailTokenHash = await crypto.createHash('sha256').update(mailToken).digest('base64');
               const linkExp = Date.now() + 10*60000;  // minutes*60000
               const encryPW = await cry.encrypt(req.body.password, mailToken);
               const tokenDoc = await tokenCol.create({'val': mailTokenHash, 'exp': linkExp, 'emailHash': hashedEmail, 'pw': encryPW});
               await tokenDoc.save();
               const logoBase64 = fs.readFileSync(
                  path.join(__dirname, "../assets/FinaDelic Logo Footer.svg"),
                  { encoding: "base64" }
               );
               const bgLogoBase64 = fs.readFileSync(
                  path.join(__dirname, "../assets/FinaDelic Logo Background.svg"),
                  { encoding: "base64" }
               );
               const mailResponseObj = await transporter.sendMail({
                  sender: {email: 'noreply@finadelic.com'}, // sender address
                  to: [{email: req.body.email}], // list of recipients
                  subject: "FinaDelic Account Email Verification", // subject line
                  // text: "email verification", // plain text body
                  htmlContent: verificationMail(mailToken, req.body.email, logoBase64, bgLogoBase64), // HTML body,
               });
               // console.log('accepted mail recipients:', mailResponseObj.accepted);
               res.status(201).send();
            } catch (err) {
               console.error("sending email (Brevo-API) failed:", err);
               res.status(502).send();
            }
         } else {
            res.status(400).send();
         }
      } else {
         res.status(406).send();
      }
   }
}


exports.getLogout = async (req, res) => {
   req.session.isLoggedIn = false;
   res.clearCookie('connect.sid');
   req.session.destroy(error => {
      if (error) {
         console.log('FOLLOWING ERROR DURING SESSION ELIMINATION OCCURRED:\n', error);
         return res.status(503).send('Failed to finish Session:', error);
      }
   });

   res.redirect('/');
}