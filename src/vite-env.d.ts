/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface Window {
  adsbygoogle?: Record<string, unknown>[]
}

interface ImportMetaEnv {
  readonly VITE_ADSENSE_CLIENT?: string
}
