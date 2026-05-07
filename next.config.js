/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['geist', 'lucide-react'],
  i18n: {
    locales: ['en', 'ms', 'id', 'zh-TW', 'zh-CN', 'vi', 'ja', 'ko'],
    defaultLocale: 'en',
    localeDetection: false,
  },
};

module.exports = nextConfig;
