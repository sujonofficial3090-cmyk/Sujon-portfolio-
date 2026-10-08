const fs = require('fs');
const html = fs.readFileSync('scripts/asctro-live.html', 'utf8');
const regex = /https:\/\/[^"'\s]+\.(?:webp|jpg|png|svg)/gi;
const matches = [...new Set(html.match(regex) || [])];
matches.filter(m => m.includes('wp-content/uploads')).forEach(m => console.log(m));
