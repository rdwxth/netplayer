import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['netplayer']
  },
  build: {
    commonjsOptions: { exclude: ['netplayer'], include: [] }
  },
  server: {
    host: '0.0.0.0', // Listen on all addresses
    port: 3000, // Specify a port
    watch: {
      usePolling: true, // Enable polling for hot reloading
    }
  }
})