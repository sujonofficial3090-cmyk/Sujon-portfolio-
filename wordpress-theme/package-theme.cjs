const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const zip = new JSZip();
const sourceDir = path.join(__dirname, 'soft-emboss');
const outputFile = path.join(__dirname, 'soft-emboss-theme.zip');

function addFolderToZip(folderPath, zipFolder) {
  const items = fs.readdirSync(folderPath);
  for (const item of items) {
    const fullPath = path.join(folderPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const subZip = zipFolder.folder(item);
      addFolderToZip(fullPath, subZip);
    } else {
      const fileData = fs.readFileSync(fullPath);
      zipFolder.file(item, fileData);
    }
  }
}

async function createThemeZip() {
  console.log('Packaging Soft Emboss WordPress Theme...');
  const rootThemeFolder = zip.folder('soft-emboss');
  addFolderToZip(sourceDir, rootThemeFolder);

  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(outputFile, content);
  const sizeMb = (content.length / (1024 * 1024)).toFixed(2);
  console.log(`Success! Created: ${outputFile} (${sizeMb} MB)`);
}

createThemeZip().catch((err) => {
  console.error('Packaging failed:', err);
  process.exit(1);
});
