module.exports = {
  '/api': {
    target: 'https://api.themoviedb.org/3/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    },
    logLevel: 'debug',
    secure: false
  }
}
