import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false, // try 5174, 5175... if 5173 is busy
    open: true,
    // Proxy ALL /api requests to the Express backend on port 5000
    // This means the browser NEVER talks to port 5000 directly — no CORS issues ever
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // keep path as-is
      }
    }
  }
})
