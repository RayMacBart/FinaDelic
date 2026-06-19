const userCol = require('../model/schemas').Users;
const crypto = require('crypto');
const transporter = require('../emailTransporter');
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
         // await transporter.verify();
         const mailToken = await crypto.randomBytes(32).toString('hex');
         const mailTokenHash = await crypto.createHash('sha256').update(mailToken).digest('base64');
         userDoc.mailLinkTokenHash = mailTokenHash;
         const linkExp = Date.now() + 10*60000;  // minutes*60000
         userDoc.mailLinkExp = linkExp;
         await userDoc.save();
         const mailResponseObj = await transporter.sendMail({
            from: 'noreply@finadelic.com', // sender address
            to: req.body.email, // list of recipients
            subject: "FinaDelic Account Password Reset", // subject line
            text: "PW reset", // plain text body
            html: resetMail(mailToken, req.body.email), // HTML body,
            attachments: [{
                  filename: "FinaDelic Logo.svg",
                  path: "./assets/FinaDelic Logo Footer.svg",
                  cid: "logo@finadelic.com", // matches the cid in the img src attribute
               }, {
                  filename: "FinaDelic BG-Logo.svg",
                  path: "./assets/FinaDelic Logo Background.svg",
                  cid: "bglogo@finadelic.com", // matches the cid in the img src attribute
               },
            ],
         });
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