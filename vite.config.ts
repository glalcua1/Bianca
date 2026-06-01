import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { consultationApiPlugin } from './server/vite-consultation-api-plugin.js'

/** Public subfolders referenced by URL paths (not figma:asset imports). */
const PUBLIC_URL_DIRS = ['Cannes', 'Rings', 'Mens', 'necklace'] as const

/** Root-level public files referenced by URL (not figma:asset imports). */
const PUBLIC_ROOT_FILES = [
  'BD_watermark.png',
  'Bianca_girl2.jpg',
  'founder.jpg',
  'Earrings.png',
  'Earrings_2.png',
  'IMG_7293.PNG',
  'Necklace.png',
] as const

// Resolve Figma asset imports (figma:asset/*) to images in public folder
function figmaAssetPlugin() {
  const publicDir = path.resolve(__dirname, 'public')
  const placeholder = path.resolve(__dirname, 'public/placeholder.png')
  return {
    name: 'figma-asset-resolver',
    resolveId(source: string) {
      if (source.startsWith('figma:asset/')) {
        const filename = source.replace('figma:asset/', '')
        const assetPath = path.join(publicDir, filename)
        return fs.existsSync(assetPath) ? assetPath : placeholder
      }
    },
  }
}

/** Copy URL-referenced public folders into dist (Cannes media, rings, etc.). */
function copyPublicUrlDirsPlugin() {
  const publicDir = path.resolve(__dirname, 'public')
  let outDir = path.resolve(__dirname, 'dist')

  return {
    name: 'copy-public-url-dirs',
    configResolved(config: { root: string; build: { outDir: string } }) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      for (const dir of PUBLIC_URL_DIRS) {
        const src = path.join(publicDir, dir)
        const dest = path.join(outDir, dir)
        if (fs.existsSync(src)) {
          fs.cpSync(src, dest, { recursive: true })
        }
      }

      for (const file of PUBLIC_ROOT_FILES) {
        const src = path.join(publicDir, file)
        const dest = path.join(outDir, file)
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest)
        }
      }

      // Apache/cPanel SPA fallback for FTP deployments (refresh on deep links).
      fs.writeFileSync(
        path.join(outDir, '.htaccess'),
        `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !^/api/
  RewriteRule . /index.html [L]
</IfModule>
`,
      )
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [
    figmaAssetPlugin(),
    copyPublicUrlDirsPlugin(),
    consultationApiPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  // Figma assets are bundled via figma:asset imports. URL-path media (Cannes, Rings, Mens)
  // are copied by copyPublicUrlDirsPlugin — not the full public/ tree (~duplicate figma PNGs).
  build: {
    copyPublicDir: false,
  },
})