import { defineConfig } from 'vitest/config'; // 🛠️ ЗАМІСТЬ 'vite'
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// 💡 ТЕПЕР ВЖЕ МОЖНА ВИКОРИСТОВУВАТИ `test`
export default defineConfig({
  plugins: [react(), TanStackRouterVite(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom', // бо React
    setupFiles: './setupTests.ts', // (не обов'язково, але зручно для jest-dom)
  },
});
