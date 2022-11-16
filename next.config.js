/** @type {import('next').NextConfig} */
const withOffline = require("next-offline");

// your next.js configs
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withOffline(nextConfig);