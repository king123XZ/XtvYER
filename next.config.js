/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'static.crunchyroll.com' },
      { protocol: 'https', hostname: 'play-lh.googleusercontent.com' },
      { protocol: 'https', hostname: 'cdn-icons-png.flaticon.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
  { protocol: 'https', hostname: 'cdn.discordapp.com' },
  { protocol: 'https', hostname: '1000marcas.net' },
    ],
  },
};

module.exports = nextConfig;
