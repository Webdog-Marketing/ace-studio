import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://acestudiobarbershop.com',
  integrations: [sitemap()],
  image: {
    // Airtable photo links expire after a few hours, so Astro downloads
    // each photo at build time and serves its own optimised copy.
    remotePatterns: [
      { protocol: 'https', hostname: '**.airtableusercontent.com' },
      { protocol: 'https', hostname: 'dl.airtable.com' },
    ],
  },
});
