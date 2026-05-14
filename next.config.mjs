/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/code-gabut',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, encoding: false, path: false, crypto: false };
    return config;
  },
};

export default nextConfig;
