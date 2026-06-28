const fs = require('fs').promises;
const path = require('path');
const rootDir = require('../util/rootpath');
const userCol = require('../model/schemas').Users;
const cry = require('../crypt');
const crypto = require('crypto');



const getAdjustedRouteName = (reqPath) => {
   let routename = reqPath;
   if (['/workspace', '/login', '/chart', '/profile'].includes(routename)) {
      if (routename === '/workspace') {
         routename = '/flowPage';
      } else if (routename === '/chart') {
         routename = '/chartPage';
      } else if (routename === '/profile') {
         routename = '/profilePage';
      } else {
         routename = '/loginPage';
      }
   }
   return routename;
}


exports.checkProperHP = (req) => {
   if (req.session.isLoggedIn) {
      return [path.join(rootDir, 'public', 'index_in.html'), 'in'];
   } else {
      return [path.join(rootDir, 'public', 'index_out.html'), 'out'];
   }
}


const injectHtml = (html, injectionId, injectionValue) => {
   const injection = `<script id="${injectionId}" type="text/plain">${injectionValue}</script>`;
   return html.replace('</html>', `${injection}</html>`);
}


exports.getInjectedHTML = async (req, htmlPath, withRoute=false) => {
   let html = await fs.readFile(htmlPath, (err) => console.log(err));
   html = html.toString();
   if (req.session.isLoggedIn) {
      if (req.path === '/workspace') {
         const saltBuffer = crypto.randomBytes(16);
         const saltBase64 = saltBuffer.toString('base64');
         const specificUserDoc = await userCol.findById(req.session.userId).select('_id pwhash clientStorageID');
         const keyBuffer = await cry.deriveKey(specificUserDoc.pwhash, saltBase64);
         const keyBase64 = keyBuffer.toString('base64');
         html = injectHtml(html, 'storeKey', keyBase64);
         html = injectHtml(html, 'storeSalt', saltBase64);
         html = injectHtml(html, 'storeID', specificUserDoc.clientStorageID);
      }
      const userEmailDoc = await userCol.findById(req.session.userId).select('_id email');
      const decryEmail = await cry.decrypt(userEmailDoc.email, req.session.userId);
      const username = decryEmail.split('@')[0].replace('.', ' ');
      html = injectHtml(html, 'username-info', username);
   }
   if (withRoute) {
      const routename = await getAdjustedRouteName(req.path);
      html = injectHtml(html, 'routeinfo', routename);
   }
   if (req.session.isLoggedIn) {
      html = html.replace('<title>', `<meta name="csrf-token" content="${req.csrfToken()}"/><title>`)
   }
   return html;
}