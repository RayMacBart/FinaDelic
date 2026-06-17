const fs = require('fs');
const crypto = require('crypto');

const randSec = crypto.randomBytes(32).toString('base64');
fs.writeFileSync('randomSecret.txt', randSec);
