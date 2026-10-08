const fs = require('fs');
const html = fs.readFileSync('scripts/asctro.html', 'utf8');

const regex = /https:\/\/asctro\.com\/wp-content\/uploads\/[^\s\"']+\.(?:webp|jpg|png|jpeg)/gi;
const matches = [...new Set(html.match(regex))];
matches.forEach(m => console.log(m));
