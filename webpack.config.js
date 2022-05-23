const path = require("path");
const { execSync } = require("child_process");
const { WebpackCompilerPlugin } = require("webpack-compiler-plugin");
const addCommentsToBundle = require("./tools/add-comments-to-bundle");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  plugins: [
    new WebpackCompilerPlugin({
      name: "add-comments-to-bundle-plugin",
      listeners: {
        compileEnd: addCommentsToBundle,
      },
    }),
  ],
};
