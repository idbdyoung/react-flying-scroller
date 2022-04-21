const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  context: path.resolve(__dirname, "lib"),
  entry: {
    index: "./index.tsx",
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "flying-scrollerss",
  },
  externals: {
    react: "react",
  },
});
