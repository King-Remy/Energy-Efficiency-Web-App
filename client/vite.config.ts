import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    headers: {
      'Content-Security-Policy': "default-src 'self'; connect-src 'self' http://localhost:5000; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self'",
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'no-referrer-when-downgrade'
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Ensure _headers file is copied to dist
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === '_headers') {
            return '_headers'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
