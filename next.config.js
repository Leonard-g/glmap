module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true
      }
    ]
  }
}
module.exports = {
  async rewrites() {
    return [
      {
        source: '/maps',
        destination: 'https://www.google.com/maps', // url de Google Maps
      },
    ]
  },
}
