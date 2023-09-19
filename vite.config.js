import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    assetsDir: 'static',
    assetsInlineLimit: 1024 * 1024 * 1024,
    cssCodeSplit: false,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  server: {
    host: 'localhost',
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
});
