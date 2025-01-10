/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'e-cdns-images.dzcdn.net',
        port: '',
        pathname: '/images/cover/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/wikipedia/en/**',
      },
      {
        protocol: 'https',
        hostname: 'cdns-images.dzcdn.net',
        port: '',
        pathname: '/images/cover/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/images/**',
      }
    ],
  },
};

module.exports = nextConfig;
