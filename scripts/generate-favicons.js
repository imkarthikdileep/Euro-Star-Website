const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateFavicons() {
  const logoPath = path.join(__dirname, '..', 'public', 'logo.png');
  if (!fs.existsSync(logoPath)) {
    console.error('public/logo.png not found!');
    process.exit(1);
  }

  console.log('Reading public/logo.png...');
  // 1. Trim transparency around the logo mark
  const trimmed = await sharp(logoPath).trim().toBuffer();
  const trimmedMeta = await sharp(trimmed).metadata();
  console.log('Trimmed dimensions:', trimmedMeta.width, 'x', trimmedMeta.height);

  // 2. We want to place the logo on a 512x512 square canvas with a clean white background.
  // To ensure the logo fits safely inside a circular cutout (radius 256):
  // max diagonal width = 256 * 2 * 0.72 ≈ 370px width, 295px height
  const targetW = 370;
  const targetH = Math.round((trimmedMeta.height / trimmedMeta.width) * targetW);
  console.log('Resizing logo to fit inside safe circle:', targetW, 'x', targetH);

  const scaledLogo = await sharp(trimmed)
    .resize(targetW, targetH, { fit: 'contain' })
    .toBuffer();

  // Create base 512x512 master square image with crisp white background
  const master512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: scaledLogo, gravity: 'center' }])
    .png()
    .toBuffer();

  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'src', 'app');

  // Generate PNG sizes
  const sizes = [
    { name: 'icon-512x512.png', size: 512, dest: [publicDir] },
    { name: 'icon.png', size: 512, dest: [appDir] },
    { name: 'icon-192x192.png', size: 192, dest: [publicDir] },
    { name: 'apple-touch-icon.png', size: 180, dest: [publicDir] },
    { name: 'apple-icon.png', size: 180, dest: [appDir] },
    { name: 'icon-96x96.png', size: 96, dest: [publicDir] },
    { name: 'icon-48x48.png', size: 48, dest: [publicDir] },
    { name: 'icon-32x32.png', size: 32, dest: [publicDir] },
    { name: 'icon-16x16.png', size: 16, dest: [publicDir] },
  ];

  for (const s of sizes) {
    const resized = await sharp(master512).resize(s.size, s.size).png().toBuffer();
    for (const d of s.dest) {
      const outPath = path.join(d, s.name);
      fs.writeFileSync(outPath, resized);
      console.log('Created:', outPath, `(${s.size}x${s.size})`);
    }
  }

  // Create Multi-Resolution ICO (16x16, 32x32, 48x48)
  const buf16 = await sharp(master512).resize(16, 16).png().toBuffer();
  const buf32 = await sharp(master512).resize(32, 32).png().toBuffer();
  const buf48 = await sharp(master512).resize(48, 48).png().toBuffer();

  const pngBuffers = [
    { width: 16, height: 16, buffer: buf16 },
    { width: 32, height: 32, buffer: buf32 },
    { width: 48, height: 48, buffer: buf48 },
  ];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // icon type: 1 = ICO
  header.writeUInt16LE(pngBuffers.length, 4); // number of images

  let offset = 6 + 16 * pngBuffers.length;
  const entries = [];
  for (const img of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width, 0);
    entry.writeUInt8(img.height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...pngBuffers.map((b) => b.buffer)]);

  // Write favicon.ico to both public/ and src/app/
  const publicIco = path.join(publicDir, 'favicon.ico');
  const appIco = path.join(appDir, 'favicon.ico');
  fs.writeFileSync(publicIco, icoBuffer);
  fs.writeFileSync(appIco, icoBuffer);
  console.log('Created multi-resolution ICO:', publicIco);
  console.log('Created multi-resolution ICO:', appIco);

  // Generate site.webmanifest
  const manifest = {
    name: 'Euro Star Electromechanical',
    short_name: 'Euro Star',
    description:
      'Precision electromechanical contracting, structural steel fabrication, TIG/arc welding, and certified manpower solutions based in Ajman, UAE. Est. 2010.',
    start_url: '/',
    display: 'standalone',
    background_color: '#101010',
    theme_color: '#C5A368',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };

  const manifestPath = path.join(publicDir, 'site.webmanifest');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Created manifest:', manifestPath);

  console.log('All favicons and icons successfully generated!');
}

generateFavicons().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
