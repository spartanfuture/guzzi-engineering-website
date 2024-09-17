/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  experimental: {
    forceSwcTransforms: false,
  },
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
