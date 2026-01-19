const rootDir = require('./path_util');
const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
   destinationPath = path.join(rootDir, 'public', 'index_out.html');
   console.log('in IN router');
   res.sendFile(destinationPath, (err) => console.log(err));
   // res.status(200).redirect(destinationPath);
});

router.get('/in', (req, res) => {
   destinationPath = path.join(rootDir, 'public', 'index_in.html');
   console.log('in OUT router');
   res.sendFile(destinationPath, (err) => console.log(err));
   // res.status(200).redirect(destinationPath);
});

// router.get('/', (req, res) => {
//    destinationPath = path.join(rootDir, 'dist_in', 'index.html');
//    res.sendFile(destinationPath, (err) => console.log(err));
//    // res.status(200).redirect(destinationPath);
// });



// router.get(['/', '/login', '/workspace', '/charts', '/legal', '/privacy', '/terms'], (req, res) => {
   
//    const indexPath = path.join(rootDir, `src_${authVar.state}`, 'index.html');
//    // implement if checks regarding active/inactive user session here:
//    // const authenticated = false;
//    // if (authenticated) {
//    //    const indexPath = path.join(rootDir, 'src_in', 'index.html');
//    // } else {
//    //    const indexPath = path.join(rootDir, 'src_out', 'index.html');
//    // }

//    let html = fs.readFileSync(indexPath, 'utf8');

//    // Inject the requested path into the HTML
//    const injection = `<script>window.__INITIAL_PATH__ = "${req.path}";</script>`;

//    // Insert before closing </body>
//    html = html.replace('</body>', `${injection}</body>`);

//    res.set('Content-Type', 'text/html');
//    res.send(html);
// });

module.exports = router;

// @ frontend:
// const initialPath = window.__INITIAL_PATH__;
// if (initialPath) { router.navigate(initialPath); }