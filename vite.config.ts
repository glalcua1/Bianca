import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

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

export default defineConfig({
  base: '/',
  plugins: [
    figmaAssetPlugin(),
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
})