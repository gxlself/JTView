module.exports = {
  runtimeCompiler: true,
  devServer: {
    port: 8083,
    disableHostCheck: true
  },
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.resolve.symlinks(true)
  },
  // 打包组件时打开
  css: { extract: false },
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      jquery: '$'
    }
  }
}
