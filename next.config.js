/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // <-- REMOVE or COMMENT THIS LINE
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;