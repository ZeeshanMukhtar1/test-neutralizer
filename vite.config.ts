import { resolve } from 'path';
import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, Plugin } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import manifest from './src/manifest';

// Safe workaround: only applies fix if bundle exists
const viteManifestHackIssue846: Plugin & {
  renderCrxManifest: (manifest: any, bundle: any) => void;
} = {
  name: 'manifestHackIssue846',
  renderCrxManifest(_manifest, bundle) {
    if (bundle['.vite/manifest.json']) {
      bundle['manifest.json'] = bundle['.vite/manifest.json'];
      bundle['manifest.json'].fileName = 'manifest.json';
      delete bundle['.vite/manifest.json'];
    }
  },
};

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    viteManifestHackIssue846,
    crx({
      manifest,
      contentScripts: {
        injectCss: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@utils': resolve(__dirname, './src/utils'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/index.html'),
        options: resolve(__dirname, 'src/options/index.html'),
        // content scripts and background worker are injected via manifest, no need here
      },
    },
  },
});
