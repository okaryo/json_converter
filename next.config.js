/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === "production" ? "/json_converter" : "",
  output: 'export',
}

module.exports = nextConfig
