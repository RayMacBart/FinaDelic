const userCol = require('../model/schemas').Users;
const crypto = require('crypto');
const brevoAPIinstance = require('../brevoAPIinstance');
const resetMail = require('../mailContents').resetEmail;
const checkAndHandleValError = require('../util/valErrorCheck');
const { validationResult } = require('express-validator');
const argon2 = require('argon2');


exports.postPWresetMail = async (req, res) => {
   if (checkAndHandleValError(req, res)) {
      return;
   }
   const hashedEmail = await crypto.createHash('sha256').update(req.body.email).digest('base64');
   const userDoc = await userCol.findOne({emailHash: hashedEmail});
   if (!userDoc) {
      res.status(409).send();
   } else {
      try {
         const mailToken = await crypto.randomBytes(32).toString('hex');
         const mailTokenHash = await crypto.createHash('sha256').update(mailToken).digest('base64');
         userDoc.mailLinkTokenHash = mailTokenHash;
         const linkExp = Date.now() + 10*60000;  // minutes*60000
         userDoc.mailLinkExp = linkExp;
         await userDoc.save();
         const logoBase64 = fs.readFileSync(
            path.join(__dirname, "../assets/FinaDelic Logo Footer.svg"),
            { encoding: "base64" }
         );
         const bgLogoBase64 = fs.readFileSync(
            path.join(__dirname, "../assets/FinaDelic Logo Background.svg"),
            { encoding: "base64" }
         );
         try {
            const mailResponseObj = await brevoAPIinstance.sendTransacEmail({
               sender: {email: 'noreply@finadelic.com'}, // sender address
               to: [{email: req.body.email}], // list of recipients
               subject: "FinaDelic Account Password Reset", // subject line
               // text: "email verification", // plain text body
               htmlContent: resetMail(mailToken, req.body.email, logoBase64, bgLogoBase64), // HTML body,
            });
            console.log('email sent:', mailResponseObj);
         } catch (error) {
            console.error('email error:', error);
         }
         // console.log('accepted mail recipients:', mailResponseObj.accepted);
         res.status(201).send();
      } catch (err) {
         console.error("SMTP Connect Verification failed:", err);
         res.status(502).send();
      }  
   }
};


exports.postPWreset = async (req, res) => {
   const hashedEmail = await crypto.createHash('sha256').update(req.body.email).digest('base64');
   const userDoc = await userCol.findOne({emailHash: hashedEmail});
   if (!userDoc) {
      res.status(409).send();
   } else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         res.status(422).send(errors.array()[0]);
         return;
      }
      const PWmatch = (req.body.password === req.body.repeat);
      if (PWmatch) {
         const passwordHash = await argon2.hash(req.body.password);
         userDoc.pwhash = passwordHash;
         userDoc.save();
         res.status(201).send();
      } else {
         res.status(400).send();
      }
   }
}