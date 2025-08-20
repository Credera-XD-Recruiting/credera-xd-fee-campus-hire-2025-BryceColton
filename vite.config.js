import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: 'localhost',
    strictPort: true,
    open: true, // Automatically open the app in the browser
  },
})
