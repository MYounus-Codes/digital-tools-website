/** @type {import('next').NextConfig} */
export default {
  images: {
    formats: ['image/avif', 'image/webp']
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    }
    return config
  },
}
