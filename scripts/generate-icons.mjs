// Generates PNG PWA icons from the SVG favicon using sharp.
// Run with: npm run icons
import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const svg = readFileSync(resolve(root, 'public/favicon.svg'))
const outDir = resolve(root, 'public/icons')
mkdirSync(outDir, { recursive: true })

const targets = [
  { size: 192, name: 'pwa-192x192.png' },
  { size: 512, name: 'pwa-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
]

for (const { size, name } of targets) {
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(resolve(outDir, name))
  console.log(`✓ ${name} (${size}x${size})`)
}
console.log('Icons generated.')
