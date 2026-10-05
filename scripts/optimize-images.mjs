import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const srcDir = path.join(root, 'fotos');
const logoSrc = path.join(root, 'logo', 'logo.jpeg');
const outDir = path.join(root, 'assets', 'img');

await mkdir(outDir, { recursive: true });

// Foto -> nombre web final. Elijo 8 de 25: las más nítidas y variadas.
const picks = {
  'P1643755.jpg': 'hero-burgers',      // 4 burgers en manos, fondo claro -> hero
  'P1643656.jpg': 'clasica',           // clásica en manos
  'P1643645.jpg': 'aguacatera',        // aguacatera close-up
  'P1643732.jpg': 'tocino',            // mermelada de tocino close-up
  'P1643717.jpg': 'hawaiana-build',    // piña + cebolla en espátula -> hawaiana
  'P1643693.jpg': 'jocho',             // jocho close-up
  'P1643767.jpg': 'alitas',            // alitas con dip
  'P1643675.jpg': 'combo',             // burger + papitas + soda en mesa
};

for (const [file, name] of Object.entries(picks)) {
  const input = path.join(srcDir, file);
  // Versión grande (hero / lightbox) y versión tarjeta
  await sharp(input).rotate().resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 }).toFile(path.join(outDir, `${name}-1400.webp`));
  await sharp(input).rotate().resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 74, effort: 6 }).toFile(path.join(outDir, `${name}-800.webp`));
  console.log('ok', name);
}

// Logo: el original es JPEG con fondo crema, no transparente.
// Lo dejamos en círculo (el CSS lo recorta), en 2 tamaños. No inventamos PNG transparente.
await sharp(logoSrc).rotate().resize({ width: 512, height: 512, fit: 'cover' })
  .webp({ quality: 85 }).toFile(path.join(outDir, 'logo-512.webp'));
await sharp(logoSrc).rotate().resize({ width: 192, height: 192, fit: 'cover' })
  .webp({ quality: 85 }).toFile(path.join(outDir, 'logo-192.webp'));

// Favicon simple: logo recortado
await sharp(logoSrc).rotate().resize({ width: 64, height: 64, fit: 'cover' })
  .png().toFile(path.join(root, 'assets', 'favicon.png'));

console.log('done');
