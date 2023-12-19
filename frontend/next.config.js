/** @type {import('next').NextConfig} */

module.exports = {
  serverRuntimeConfig: {
    backendURI: process.env.BACKEND_URI,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [{ loader: '@svgr/webpack', options: { icon: true }}],
    });

    return config;
  },
}
