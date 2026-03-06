const fs = require('fs');
fs.copyFileSync('src/assets/goni-logo-sm.png', 'public/og-image.png');
console.log('done!');
