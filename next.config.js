/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['geist'],
  i18n: {
    locales: ['en', 'ms', 'id', 'zh-TW', 'zh-CN', 'vi', 'ja', 'ko'],
    defaultLocale: 'en',
    localeDetection: false,
  },
};

module.exports = nextConfig;
