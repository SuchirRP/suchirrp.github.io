import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://suchirrp.github.io',
  trailingSlash: 'always',
  integrations: [react()],
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
});
