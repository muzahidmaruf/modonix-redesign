const fs = require('fs');
function w(f,c){fs.writeFileSync(f,c,'utf8');console.log('Wrote '+f+' ('+c.length+' bytes)');}

// Read all scraped content
const scraped = {};
const files = fs.readdirSync('scraped');
files.forEach(f => {
  const name = f.replace('.json','');
  scraped[name] = JSON.parse(fs.readFileSync('scraped/'+f,'utf8'));
});
console.log('Loaded scraped data:', Object.keys(scraped).join(', '));

// Build will continue in build2.js, build3.js etc.
// For now just confirm setup
console.log('Setup complete');
