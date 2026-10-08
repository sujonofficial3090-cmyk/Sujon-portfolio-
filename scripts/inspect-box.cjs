const fs = require('fs');
const html = fs.readFileSync('scripts/asctro.html', 'utf8');

const idx = html.indexOf('matter-box');
if (idx !== -1) {
  console.log('Surrounding HTML of matter-box:');
  console.log(html.slice(Math.max(0, idx - 400), idx + 1200));
}
