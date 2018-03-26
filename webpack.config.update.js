// webpack.config.update.js
module.exports = function update(webpackConfig) {
  webpackConfig.entry["second.bundle"] = [
    "./node_modules/rax-scripts/lib/dev-utils/webpackHotDevClient.js",
    "./node_modules/rax-hot-loader/patch.js",
    "./src/resultRender.js"
  ];
  console.log("here", webpackConfig);
  return webpackConfig;
};
