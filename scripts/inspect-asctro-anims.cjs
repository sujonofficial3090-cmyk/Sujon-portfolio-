const fs = require('fs');
const html = fs.readFileSync('scripts/asctro.html', 'utf8');

const checks = [
  'gsap', 'scrolltrigger', 'lenis', 'locomotive', 'swiper', 'lottie', 
  'cursor', 'marquee', 'split', 'three', 'canvas', 'svg', 'tilt'
];

console.log('--- Animation Libraries on asctro.com ---');
checks.forEach(lib => {
  const count = (html.toLowerCase().match(new RegExp(lib, 'g')) || []).length;
  console.log(`${lib}: ${count} occurrences`);
});

// Check key section titles and headings on asctro.com
const headings = [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)]
  .map(m => m[1].replace(/<[^>]+>/g, '').trim())
  .filter(t => t.length > 0 && t.length < 100);

console.log('\n--- Main Headings on asctro.com ---');
console.log([...new Set(headings)].slice(0, 20));
