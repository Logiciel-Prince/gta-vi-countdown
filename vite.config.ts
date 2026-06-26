import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'GTA VI Countdown — Vice City Awaits',
        short_name: 'GTA VI',
        description: 'A premium live countdown to GTA VI. Every second brings us closer to Vice City.',
        theme_color: '#ff2bd6',
        background_color: '#0a0118',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          { src: 'icons/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        // Precache the app shell only (JS/CSS/HTML/icons/fonts). Photos are
        // cached on first view via runtimeCaching below, so the initial
        // install stays small instead of pulling every gallery image up front.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        runtimeCaching: [
          {
            // Gallery + wallpaper photos: cache after first view, work offline thereafter.
            urlPattern: /\/gallery\/.*\.(?:jpe?g|png)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gallery-images',
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/i\.ytimg\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'youtube-thumbnails',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
})
