import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.resellerpro.io',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'RessellerPro',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
};

export default nextConfig;
