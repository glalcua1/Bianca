/**
 * After `vite build`, ensure every URL-path image referenced in atelier data
 * exists under dist/. Catches missing copyPublicUrlDirs entries before deploy.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const dataFile = path.join(root, 'src/app/data/fineJewelleryCollections.ts')

const source = fs.readFileSync(dataFile, 'utf8')
const imagePaths = [
  ...source.matchAll(/image:\s*"(\/[^"]+)"/g),
  ...source.matchAll(/video:\s*"(\/[^"]+)"/g),
].map((m) => m[1])

const missing = imagePaths.filter((urlPath) => {
  const relative = urlPath.replace(/^\//, '')
  const filePath = path.join(distDir, relative)
  return !fs.existsSync(filePath)
})

if (missing.length > 0) {
  console.error('Missing assets in dist/ (will 404 in production):\n')
  for (const p of missing) console.error(`  ${p}`)
  process.exit(1)
}

console.log(`Verified ${imagePaths.length} atelier image paths in dist/`)
