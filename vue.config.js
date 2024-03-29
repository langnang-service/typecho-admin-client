module.exports = {
  // 基本路径
  // publicPath: process.env.NODE_ENV === "production" ? "/admin/" : "/",
  publicPath: "/admin/",
  // 构建时的输入目录
  outputDir: "dist",
  // 配置 webpack-dev-server 行为
  devServer: {
    hot: true,
    // 设置是否自动打开浏览器
    open: true,
    host: "0.0.0.0",
    port: '8080', // 端口
    sockHost: 'localhost:8080',// localhost[端口]、IP[端口]、域名
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: 'http://localhost:9090',
        changeOrigin: true,
        pathRewrite: {
          "^/api": "http://localhost:9090/api"
        }
      }
    }
  },
  // 接收一个基于 webpack-chain 的 ChainableConfig 实例。
  // 允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: function (config) {
    config.plugin("html").tap(function (args) {
      args[0].title = "Typecho Admin - Langnang Service"; // 自定义标题
      return args;
    })
    // 打包时去掉 console.log
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })

  }
};
