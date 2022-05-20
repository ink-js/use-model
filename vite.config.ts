import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import profile from './package.json'

export default defineConfig({
  esbuild: {
    treeShaking: false
  },
  plugins: [react()],
  define: {
    VERSION: JSON.stringify(profile.version)
  },
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'source/index.tsx'),
      name: 'UseModel',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react/jsx-runtime': 'JSX'
        }
      }
    }
  }
})
