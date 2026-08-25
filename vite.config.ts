import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  appType: 'mpa',
  server: {
    port: 7700,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
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
    },
  },
});
