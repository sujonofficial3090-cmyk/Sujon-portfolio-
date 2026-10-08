const fs = require('fs');
const html = fs.readFileSync('scripts/asctro.html', 'utf8');

const regex = /https:\/\/asctro\.com\/wp-content\/uploads\/[^\s\"']+\.(?:webp|jpg|png|jpeg)/gi;
const matches = [...new Set(html.match(regex))];
console.log('Total unique images:', matches.length);
matches.forEach(m => {
  if (m.includes('sun') || m.includes('moon') || m.includes('planet') || m.includes('bg') || m.includes('sphere') || m.includes('partner') || m.includes('hero') || m.includes('earth')) {
    console.log(m);
  }
});
