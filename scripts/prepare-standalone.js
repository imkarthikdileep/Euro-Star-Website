const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

const rootDir = path.resolve(__dirname, '..');
const standaloneDir = path.join(rootDir, '.next', 'standalone');

if (fs.existsSync(standaloneDir)) {
  console.log('[prepare-standalone] Standalone directory found. Copying static assets...');
  
  // 1. Copy public directory to .next/standalone/public
  const publicDir = path.join(rootDir, 'public');
  if (fs.existsSync(publicDir)) {
    copyFolderSync(publicDir, path.join(standaloneDir, 'public'));
    console.log('[prepare-standalone] Copied public/ -> .next/standalone/public/');
  }

  // 2. Copy .next/static directory to .next/standalone/.next/static
  const staticDir = path.join(rootDir, '.next', 'static');
  if (fs.existsSync(staticDir)) {
    copyFolderSync(staticDir, path.join(standaloneDir, '.next', 'static'));
    console.log('[prepare-standalone] Copied .next/static/ -> .next/standalone/.next/static/');
  }

  console.log('[prepare-standalone] Standalone server bundle is ready for production.');
} else {
  console.warn('[prepare-standalone] No .next/standalone found. Skipping asset copy.');
}
