const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  context: path.resolve(__dirname, "lib"),
  entry: {
    index: "./index.js",
  },
});
