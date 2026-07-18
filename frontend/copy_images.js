const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\4f30dc99-ff4f-4585-8faf-80de84792119';
const destDir = 'd:\\job-reqruitment\\frontend\\src\\assets\\image';

const files = [
  { src: 'service_permanent_1784353352751.png', dest: 'service_permanent.png' },
  { src: 'service_contract_1784353367236.png', dest: 'service_contract.png' },
  { src: 'service_executive_1784353380739.png', dest: 'service_executive.png' },
  { src: 'service_bulk_1784353394496.png', dest: 'service_bulk.png' },
  { src: 'jobs_banner_bg_1784357376764.png', dest: 'jobs_banner_bg.png' }
];

files.forEach(f => {
  const srcPath = path.join(srcDir, f.src);
  const destPath = path.join(destDir, f.dest);
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${f.src} to ${f.dest} successfully!`);
  } catch (err) {
    console.error(`Failed to copy ${f.src}:`, err.message);
  }
});
