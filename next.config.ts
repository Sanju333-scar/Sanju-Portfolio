import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

// Enable Cloudflare bindings during local development
setupDevPlatform().catch(console.error)

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',

  webpack: (config) => {
    return config
  },

  turbopack: {},

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
}

export default nextConfig