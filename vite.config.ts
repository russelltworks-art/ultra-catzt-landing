import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname),
  envDir: resolve(__dirname, '../..'),
  appType: 'mpa',
  plugins: [react()],
  define: {
    __APP_BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  resolve: {
    alias: {
      'react-native': resolve(__dirname, 'src/lib/reactNativeMock.tsx'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  server: {
    port: 7700,
    strictPort: true,
    fs: {
      allow: [resolve(__dirname, '../..')],
    },
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    watch: {
      ignored: [],
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        apropos: resolve(__dirname, 'a-propos/index.html'),
        actualites: resolve(__dirname, 'actualites/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        expertises: resolve(__dirname, 'expertises/index.html'),
        mentions: resolve(__dirname, 'mentions-legales/index.html'),
        rejoindre: resolve(__dirname, 'nous-rejoindre/index.html'),
        references: resolve(__dirname, 'references/index.html'),
        expAffaires: resolve(__dirname, 'expertises/affaires-publiques/index.html'),
        expMarque: resolve(__dirname, 'expertises/communication-de-marque/index.html'),
        expFinanciere: resolve(__dirname, 'expertises/communication-financiere/index.html'),
        expCoord: resolve(__dirname, 'expertises/coordination-internationale/index.html'),
        expCorp: resolve(__dirname, 'expertises/corporate-engagement/index.html'),
        expCrise: resolve(__dirname, 'expertises/crise/index.html'),
        expDigital: resolve(__dirname, 'expertises/digital-social-media/index.html'),
        expIntel: resolve(__dirname, 'expertises/intelligence-strategique/index.html'),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
});
