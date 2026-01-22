const fs = require('fs').promises;
const path = require('path');
const rootDir = require('../util/rootpath.js');
const checkAuth = require('./checkAuth.js');


const checkProperHP = (req) => {
      const authenticated = checkAuth(req);
      if (authenticated) {
         return [path.join(rootDir, 'public', 'index_in.html'), 'in'];
      } else {
         return [path.join(rootDir, 'public', 'index_out.html'), 'out'];
      }
   }


const getAdjustedRouteName = (reqPath) => {
   let routename = reqPath;
   if (['/workspace', '/login', '/chart'].includes(routename)) {
      if (routename === '/workspace') {
         routename = '/flowPage';
      } else if (routename === '/chart') {
         routename = '/chartPage';
      } else {
         routename = '/loginPage';
      }
   }
   return routename;
}


class GeneralPages {

   static async getPage(req, res) {
      const [htmlPath, authState] = checkProperHP(req);
      if (authState === 'in' && req.path === '/login') {
         res.redirect('/');
      } else if ((authState === 'out') && (['/workspace', '/chart'].includes(req.path))) {
         res.redirect('/login');
      } else {
         let html = await fs.readFile(htmlPath, (err) => console.log(err));
         html = html.toString();
         const routename = getAdjustedRouteName(req.path);
         const injection = `<script id="routeinfo" type="text/plain">${routename}</script>`;
         html = html.replace('</html>', `${injection}</html>`);
         res.set({'Content-Type': 'text/html'});
         res.send(html);
      }
   }

   static getRootPage(req, res) {
      const authResultArray = checkProperHP(req);
      res.sendFile(authResultArray[0], (err) => console.log(err));
   }
}

module.exports = GeneralPages;