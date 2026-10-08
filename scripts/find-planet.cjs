const fs = require('fs');
const html = fs.readFileSync('scripts/asctro.html', 'utf8');

const boxIdx = html.indexOf('Partners Across');
const sectionHtml = html.slice(Math.max(0, boxIdx - 2000), boxIdx + 3000);

const imgs = [...sectionHtml.matchAll(/(https:\/\/[^\"'\s]+(?:jpg|jpeg|png|webp|svg|gif))/gi)];
console.log('Images near Partners section:');
imgs.forEach(m => console.log(m[1]));
