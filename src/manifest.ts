import { defineManifest } from '@crxjs/vite-plugin';

import packageData from '../package.json';

const isDev = true;

export default defineManifest({
  manifest_version: 3,
  name: `${packageData.displayName || packageData.name}${isDev ? ' ➡️ Dev' : ''}`,
  version: packageData.version,
  description: packageData.description,
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  permissions: ['activeTab', 'storage'],
  content_scripts: [
    {
      js: isDev
        ? ['src/content/index.dev.tsx']
        : ['src/content/index.prod.tsx'],
      matches: ['<all_urls>'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['assets/*'],
      matches: ['<all_urls>'],
    },
  ],
});
