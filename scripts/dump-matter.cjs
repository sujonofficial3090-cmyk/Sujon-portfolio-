const fs = require('fs');
const html = fs.readFileSync('scripts/asctro.html', 'utf8');

const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let sm;
while ((sm = scriptRegex.exec(html)) !== null) {
  if (sm[1].includes('var Engine=Matter.Engine') || sm[1].includes('Engine.create()')) {
    fs.writeFileSync('scripts/matter-script-full.js', sm[1]);
    console.log('Saved matter-script-full.js');
  }
}
