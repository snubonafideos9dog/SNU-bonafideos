import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 5173, open: true },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]__[hash:base64:4]'
    }
  },
  build: { outDir: 'dist', assetsInlineLimit: 4096 }
})
