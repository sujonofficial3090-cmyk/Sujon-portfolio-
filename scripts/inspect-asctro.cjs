const https = require('https');

https.get('https://asctro.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Total length:', data.length);
    console.log('Has matter.js:', data.toLowerCase().includes('matter'));
    console.log('Has physics:', data.toLowerCase().includes('physics'));
    console.log('Has canvas:', data.includes('<canvas'));
    
    // Find section with Partners Across Every Stage
    const idx = data.indexOf('Partners Across Every Stage');
    if (idx !== -1) {
      console.log('Partners section surrounding HTML:');
      console.log(data.slice(Math.max(0, idx - 500), idx + 2500));
    } else {
      console.log('Could not find exact text "Partners Across Every Stage"');
    }
  });
}).on('error', err => console.error(err));
