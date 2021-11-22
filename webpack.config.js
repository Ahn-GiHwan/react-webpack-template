const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { from } = require("webpack-sources/lib/CompatSource");

module.exports = (env, option) => {
  return {
    entry: "./src/main.js",
    output: {
      filename: "main.js",
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [["@babel/plugin-transform-runtime", { corejs: 3 }]],
            },
          },
        },
        {
          test: /\.css/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new CopyPlugin({
        patterns: [{ from: "static" }],
      }),
    ],
  };
};
