const fs = require('fs');
const html = fs.readFileSync('scripts/asctro-live.html', 'utf8');

console.log('File size:', html.length);
console.log('Contains webflow:', html.toLowerCase().includes('webflow'));

// Search for any mention of partner logos or physics
const keywords = ['webflow', 'shopify', 'hubspot', 'bloomberg', 'zendesk', 'matter', 'canvas', 'ecosystem', 'partners'];
keywords.forEach(k => {
  const matches = (html.toLowerCase().match(new RegExp(k, 'g')) || []).length;
  console.log(`${k}: ${matches} occurrences`);
});

// Find lines containing webflow
const lines = html.split('\n');
lines.forEach((line, i) => {
  if (line.toLowerCase().includes('webflow')) {
    console.log(`Line ${i}:`, line.slice(0, 300));
  }
});

// Search for external scripts
const scriptMatches = [...html.matchAll(/<script[^>]*src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('\n--- Scripts ---');
scriptMatches.forEach(s => console.log(s));
