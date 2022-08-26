/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://moviedb-next-js.vercel.app/',
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ['m.media-amazon.com'],
  },
}

module.exports = nextConfig
