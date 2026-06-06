import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Allows Vite to accept connections over the Tailscale network interface
    host:true,
    allowedHosts: [
      'moozek-laptop.taile71b45.ts.net' // Include if not using Tailscale HTTPS
    ]
  }
})
