const fs = require('fs');
const https = require('https');

https.get('https://asctro.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/asctro.html', data);
    console.log('Saved asctro.html. Length:', data.length);
    ['bloomberg', 'clutch', 'zendesk', 'matter', 'shopify', 'webflow'].forEach(term => {
      const regex = new RegExp(term, 'gi');
      const matches = [...data.matchAll(regex)];
      console.log(`Term "${term}": ${matches.length} occurrences`);
      if (matches.length > 0) {
        const first = matches[0].index;
        console.log(`Snippet around ${term}:`, data.slice(Math.max(0, first - 150), first + 250));
      }
    });
  });
});
