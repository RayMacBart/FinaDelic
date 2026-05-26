const path = require('path');
const rootDir = require('../util/rootpath');
const Util = require('./ctrlUtils');


class GeneralPages {

   async getPage(req, res) {
      const [htmlPath, authState] = await Util.checkProperHP(req);
      if (authState === 'in' && req.path === '/login') {
         return res.redirect('/');
      } else if (['/workspace', '/chart', '/profile'].includes(req.path) && (authState === 'out')) {
         return res.redirect('/login');
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