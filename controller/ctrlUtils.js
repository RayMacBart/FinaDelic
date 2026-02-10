const fs = require('fs').promises;
const path = require('path');
const rootDir = require('../util/rootpath');
const userCol = require('../model/schemas').Users;



getAdjustedRouteName = (reqPath) => {
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


exports.checkProperHP = (req) => {
   if (req.session.isLoggedIn) {
      return [path.join(rootDir, 'public', 'index_in.html'), 'in'];
   } else {
      return [path.join(rootDir, 'public', 'index_out.html'), 'out'];
   }
}


injectHtml = async (html, injectionId, injectionValue) => {
   const injection = `<script id="${injectionId}" type="text/plain">${injectionValue}</script>`;
   return html.replace('</html>', `${injection}</html>`);
}


exports.getInjectedHTML = async (req, htmlPath, withRoute=false) => {
   let html = await fs.readFile(htmlPath, (err) => console.log(err));
   html = html.toString();
   const userEmailDoc = await userCol.findById(req.session.userId).select('_id email');
   const username = userEmailDoc.email.split('@')[0];
   html = await injectHtml(html, 'username-info', username);
   if (withRoute) {
      const routename = await getAdjustedRouteName(req.path);
      html = await injectHtml(html, 'routeinfo', routename);
   }
   return html;
}