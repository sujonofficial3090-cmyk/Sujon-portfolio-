const fs = require('fs');
const html = fs.readFileSync('scripts/asctro-live.html', 'utf8');

const regex = /<div[^>]*class="[^"]*ball[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null && count < 10) {
  count++;
  console.log(`=== Ball ${count} ===`);
  console.log(match[0]);
}

// Also check the matter-1 script
if (fs.existsSync('scripts/asctro-matter-1.js')) {
  const js = fs.readFileSync('scripts/asctro-matter-1.js', 'utf8');
  console.log('=== Matter JS excerpt ===');
  console.log(js.substring(0, 1000));
}
