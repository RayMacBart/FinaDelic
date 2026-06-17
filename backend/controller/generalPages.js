const path = require('path');
const rootDir = require('../util/rootpath');
const Util = require('./ctrlUtils');
const User = require('../model/User');
const cry = require('../crypt');
const userCol = require('../model/schemas').Users;
const tokenCol = require('../model/schemas').Tokens;
const crypto = require('crypto');


class GeneralPages {

   async getPage(req, res) {
      const [htmlPath, authState] = await Util.checkProperHP(req);
      if (authState === 'in' && req.path === '/login') {
         return res.redirect('/');
      } else if (['/workspace', '/chart', '/profile'].includes(req.path) && (authState === 'out')) {
         return res.redirect('/login');
      } else if (req.path === '/confirmation' && (authState === 'out')) {
         const hashedEmail = await crypto.createHash('sha256').update(req.query.usermail).digest('base64');
         const receivedTokenHash = await crypto.createHash('sha256').update(req.query.token).digest('base64');
         const tokenDoc = await tokenCol.findOne({emailHash: hashedEmail, val: receivedTokenHash});
         const decryPW = await cry.decrypt(tokenDoc.pw, req.query.token);

         if ((tokenDoc.val === receivedTokenHash) && (Date.now() < tokenDoc.exp)) {
            await tokenDoc.deleteOne();
            const newUser = await User.create(req.query.usermail, decryPW);
            newUser.email = await cry.encrypt(req.query.usermail, newUser._id);
            await newUser.save();
            req.session.userId = newUser._id;
            req.session.isLoggedIn = true;
            res.sendFile(path.join(rootDir, 'confirmation.html'), (err) => console.log(err));
         } else {
            await tokenDoc.deleteOne();
            res.status(403).send('The used link has expired!');
         }

      } else if (req.path === '/PWresetPage' && (authState === 'out')) {
         const hashedEmail = await crypto.createHash('sha256').update(req.query.usermail).digest('base64');
         const userDoc = await userCol.findOne({emailHash: hashedEmail});
         const receivedTokenHash = crypto.createHash('sha256').update(req.query.token).digest('base64');
         if ((userDoc.mailLinkTokenHash === receivedTokenHash) && (Date.now() < userDoc.mailLinkExp)) {
            userDoc.mailLinkTokenHash = '';
            userDoc.mailLinkExp = 0;
            res.sendFile(path.join(rootDir, 'PWreset', 'PWreset.html'), (err) => console.log(err));
         } else {
            res.status(403).send('The used link has expired!');
         }
      } else {
         const html = await Util.getInjectedHTML(req, htmlPath, true);
         res.set({'Content-Type': 'text/html'});
         return res.send(html);
      }
   }

   async getRootPage(req, res) {
      const [htmlPath, authState] = await Util.checkProperHP(req);
      if (authState === 'out') {
         res.sendFile(htmlPath, (err) => console.log(err));
      } else {
         const html = await Util.getInjectedHTML(req, htmlPath);
         res.set({'Content-Type': 'text/html'});
         res.send(html);
      }
   }
}

const genPages = new GeneralPages();

module.exports = genPages;