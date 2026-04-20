const fs = require('fs');
function w(f,c){fs.writeFileSync(f,c,'utf8');console.log('Wrote '+f+' ('+c.length+' bytes)');}
const LOGO = '<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="14,2 26,26 2,26" fill="#FF6B35"/><polygon points="14,10 20,26 8,26" fill="#FF8C5A" opacity="0.6"/></svg>';
