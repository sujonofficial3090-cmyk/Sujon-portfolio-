const fs = require('fs');
const html = fs.readFileSync('scripts/asctro.html', 'utf8');

const boxIdx = html.indexOf('matter-box');
const boxSub = html.slice(boxIdx, boxIdx + 12000);
const imgMatches = [...boxSub.matchAll(/data-src=[\"']([^\"']+)[\"']/g)];
console.log('Logos found in matter-box:');
imgMatches.forEach(m => console.log(m[1]));
