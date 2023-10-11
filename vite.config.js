import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const commonConfig = {
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
    server: {
      host: true,
      port: 5173,
      watch: {
        usePolling: true,
      },
    },
    envDir: 'configs',
  };

  if (command === 'build' && mode === 'production') {
    return {
      ...commonConfig,
      esbuild: {
        pure: ['console.debug'],
      },
    };
  }
  return commonConfig;
});
