// webpack.config.update.js
const webpack = require("webpack");
const package = require("./package.json");
const path = require("path");

module.exports = function update(webpackConfig) {
  webpackConfig.entry["com.muxistudio.lib.main"] = [
    path.resolve(__dirname, "./src/index.js")
  ];
  webpackConfig.entry["com.muxistudio.lib.search.result"] = [
    path.resolve(__dirname, "./src/second.js")
  ];
  webpackConfig.entry["com.muxistudio.lib.search.detail"] = [
    path.resolve(__dirname, "./src/third.js")
  ];
  console.log("current env", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    webpackConfig.plugins[7].options.include = /\.js$/;
    webpackConfig.plugins.push(
      new webpack.BannerPlugin({
        banner: `com.muxistudio.lib, version ${
          package.version
        }, built time: ${Date()}`
      })
    );
  }
  return webpackConfig;
};
