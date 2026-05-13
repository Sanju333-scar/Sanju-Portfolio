import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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