const rootDir = require('./path_util');
const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get(['/', '/login', '/workspace', '/charts', '/legal', '/privacy', '/terms'], (req, res) => {
   
   // separate your codebase in loggedin and loggedout part (from 2 different 'index.htmls') and
   // implement if checks regarding active/inactive user session here
   const indexPath = path.join(rootDir, 'dist', 'index.html');
   let html = fs.readFileSync(indexPath, 'utf8');

   // Inject the requested path into the HTML
   const injection = `<script>window.__INITIAL_PATH__ = "${req.path}";</script>`;

   // Insert before closing </body>
   html = html.replace('</body>', `${injection}</body>`);

   res.set('Content-Type', 'text/html');
   res.send(html);
});

module.exports = router;

// @ frontend:
// const initialPath = window.__INITIAL_PATH__;
// if (initialPath) { router.navigate(initialPath); }