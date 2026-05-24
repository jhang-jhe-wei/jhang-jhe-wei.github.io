const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  transpilePackages: ['@mui/x-charts'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'user-images.githubusercontent.com' },
      { protocol: 'https', hostname: 'private-user-images.githubusercontent.com' },
      { protocol: 'https', hostname: 'github.com', pathname: '/**/assets/**' }
    ]
  }
}
