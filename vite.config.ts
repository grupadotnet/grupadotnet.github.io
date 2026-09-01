import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import fs from 'fs';
import { fileURLToPath } from 'url';

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    tanstackRouter(),
    react(),
    tailwindcss(),
    {
      name: 'copy-index-to-404',
      writeBundle() {
        // Copies index.html to 404.html after every build
        const distPath = path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          'dist'
        );
        fs.copyFileSync(
          path.join(distPath, 'index.html'),
          path.join(distPath, '404.html')
        );
      },
    },
  ],
  server: {
    // Allows Vite to accept connections over the Tailscale network interface
    host: true,
    allowedHosts: [
      'moozek-laptop.taile71b45.ts.net',
      'moozek-pc.taile71b45.ts.net', // Include if not using Tailscale HTTPS
      'grupadotnet.github.io',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
    },
  },
});
