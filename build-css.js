const fs = require('fs');
function w(f,c){fs.writeFileSync(f,c,'utf8');console.log('Wrote '+f+' ('+c.length+' bytes)');}

// ============ CSS ============
const css = fs.readFileSync('css-parts/part1.css','utf8') + fs.readFileSync('css-parts/part2.css','utf8') + fs.readFileSync('css-parts/part3.css','utf8');
w('styles.css', css);
console.log('CSS done');
