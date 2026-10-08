const fs = require('fs');
const html = fs.readFileSync('scripts/asctro-live.html', 'utf8');

// Find script tags containing shopify or Bodies.circle
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let sm;
let found = 0;
while ((sm = scriptRegex.exec(html)) !== null) {
  if (sm[1].includes('shopify') || sm[1].includes('Bodies.circle')) {
    found++;
    console.log(`\n=== Found script #${found} (${sm[1].length} chars) ===`);
    fs.writeFileSync(`scripts/asctro-matter-${found}.js`, sm[1]);
    console.log(sm[1].slice(0, 1500));
  }
}
