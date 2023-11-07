const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
  target: 'https://api-web.nhle.com',
  changeOrigin: true,
};
// eslint-disable-next-line no-undef
module.exports = function (app) {
  app.use('/v1', createProxyMiddleware(proxy));
};
