// scripts/compress-images.js
// One-time script to resize + compress oversized images in src/assets
// Run with: node scripts/compress-images.js

import sharp from "sharp";
import fs from "fs";
import path from "path";

const ASSETS_DIR = path.resolve("src/assets");
const MAX_WIDTH = 1600;
const JPG_QUALITY = 78;
const PNG_QUALITY = 80;
const BACKUP_DIR = path.resolve("src/assets/_originals");

const SIZE_THRESHOLD = 400 * 1024; // 400 KB

async function processImage(filePath) {
  const stat = fs.statSync(filePath);
  if (stat.size < SIZE_THRESHOLD) {
    console.log(`SKIP (small): ${path.basename(filePath)} (${(stat.size/1024).toFixed(0)} KB)`);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const name = path.basename(filePath);
  const backupPath = path.join(BACKUP_DIR, name);

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
  }

  const buffer = fs.readFileSync(backupPath);
  let pipeline = sharp(buffer).resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (ext === ".png") {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true });
  } else if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true });
  } else {
    console.log(`SKIP (unsupported ext): ${name}`);
    return;
  }

  const outBuffer = await pipeline.toBuffer();
  fs.writeFileSync(filePath, outBuffer);

  const newSize = fs.statSync(filePath).size;
  console.log(
    `DONE: ${name}  ${(stat.size/1024/1024).toFixed(2)} MB -> ${(newSize/1024/1024).toFixed(2)} MB ` +
    `(${(100 - (newSize/stat.size)*100).toFixed(1)}% smaller)`
  );
}

async function main() {
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

  const files = fs.readdirSync(ASSETS_DIR)
    .filter(f => /\.(png|jpe?g)$/i.test(f))
    .map(f => path.join(ASSETS_DIR, f));

  for (const file of files) {
    try {
      await processImage(file);
    } catch (err) {
      console.error(`ERROR processing ${file}:`, err.message);
    }
  }

  console.log("\nAll done. Originals backed up to src/assets/_originals/");
}

main();