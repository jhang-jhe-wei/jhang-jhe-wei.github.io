const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  experimental: {
    appDir: true
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  transpilePackages: ['@mui/x-charts']
}
