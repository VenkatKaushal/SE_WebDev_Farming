import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'Your App Title', // Optional: Dynamically inject title into HTML
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Matches tsconfig.json paths
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    middlewareMode: true,
    proxy: {
      // Optional: Proxy API requests if needed
      '/api': {
        target: 'https://se-webdev-farming.onrender.com/', // Your backend API
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 8080, // Optional: Define a specific port for the preview server
  },
});
