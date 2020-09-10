module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      const [obj] = args;
      obj.title = 'MOUNTAIN';
      obj.meta = {
        keywords: 'mountain, 登山電商網站, 個人作品',
      }
      obj.icon = 'static/shill.png';
      return args;
    });
  },
  publicPath: './',
};