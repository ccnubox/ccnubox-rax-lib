// webpack.config.update.js
module.exports = function update(webpackConfig) {
  webpackConfig.entry["second.bundle"] = ["./src/second.js"];
  webpackConfig.entry["third.bundle"] = ["./src/third.js"];
  //console.log("here", webpackConfig);
  return webpackConfig;
};
