const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'assets', 'partners');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const logos = [
  { name: 'meta-partner.webp', url: 'https://asctro.com/wp-content/uploads/2026/03/facebook-meta-business-partner.webp' },
  { name: 'hubspot-partner.webp', url: 'https://asctro.com/wp-content/uploads/2026/03/hubspot-certified-partner.webp' },
  { name: 'shopify-partner.webp', url: 'https://asctro.com/wp-content/uploads/2026/03/shopify-partner-logo-1-1.webp' },
  { name: 'clutch.webp', url: 'https://asctro.com/wp-content/uploads/2026/03/clutch.webp' },
  { name: 'webflow.webp', url: 'https://asctro.com/wp-content/uploads/2026/03/Mask-group-1.webp' },
  { name: 'bloomberg.webp', url: 'https://asctro.com/wp-content/uploads/2026/03/bloomberg.webp' },
  { name: 'zendesk.webp', url: 'https://asctro.com/wp-content/uploads/2026/03/zendesk.webp' },
  { name: 'google-partner.webp', url: 'https://asctro.com/wp-content/uploads/2026/03/google-partner.webp' },
];

function download(item) {
  return new Promise((resolve, reject) => {
    const dest = path.join(dir, item.name);
    const file = fs.createWriteStream(dest);
    https.get(item.url, res => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed ${res.statusCode} for ${item.url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Saved ${item.name} (${fs.statSync(dest).size} bytes)`);
          resolve();
        });
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

Promise.all(logos.map(download))
  .then(() => console.log('All 8 partner logos downloaded successfully!'))
  .catch(err => console.error('Error downloading:', err));
