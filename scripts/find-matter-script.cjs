const fs = require('fs');
const html = fs.readFileSync('scripts/asctro.html', 'utf8');

const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let sm;
while ((sm = scriptRegex.exec(html)) !== null) {
  if (sm[1].toLowerCase().includes('matter') || sm[1].toLowerCase().includes('engine.create')) {
    console.log(`Script with "matter" found (${sm[1].length} chars):`);
    console.log(sm[1].slice(0, 1500));
    console.log('==================================================');
  }
}

// Also check external scripts
const srcRegex = /<script[^>]*src=[\"']([^\"']+)[\"'][^>]*>/gi;
let srcM;
while ((srcM = srcRegex.exec(html)) !== null) {
  if (srcM[1].toLowerCase().includes('matter')) {
    console.log('External script src:', srcM[1]);
  }
}
