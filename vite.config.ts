import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import fs from 'fs';

// 1. Read the file synchronously using Node's fs module
const templatePath = path.resolve(process.cwd(), 'src/template.tsx');
const rawTemplate = fs.readFileSync(templatePath, 'utf-8');
// https://vite.dev/config/

const processedTemplate = rawTemplate // 1. Swap the literal import for the TanStack token
  .replace(
    /import\s+\{\s*createFileRoute\s*}\s+from\s+['"]@tanstack\/react-router['"];?/,
    '%%tsrImports%%'
  )
  // 2. Erase the @ts-expect-error comment from the final generated file
  .replace(/\/\/\s*@ts-expect-error.*\n/g, '');

export default defineConfig({
  plugins: [
    tanstackRouter({
      customScaffolding: {
        routeTemplate: processedTemplate,
      },
    }),
    react(),
    tailwindcss(),
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
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
