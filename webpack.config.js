const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const webpack = require("webpack");

module.exports = {
   mode: "development",
   entry: "./src/index.js",
   output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      clean: true,
   },
   devServer: {
      static: {
         directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 8080,
      devMiddleware: {
         index: true,
         mimeTypes: { phtml: 'text/html' },
         publicPath: '/dist',
         serverSideRender: true,
         writeToDisk: true,
      },
      historyApiFallback: true,
   },
   devtool: "eval-cheap-module-source-map",
   plugins: [
      new CopyPlugin({
         patterns: [
            { from: "assets", to: "assets" },
            { from: "assets/icons", to: "assets/icons" },
            { from: "lib/fonts", to: "fonts" }
         ],
      }),
      new HtmlPlugin({
         template: 'src/index.html',
         inject: false,
      }),
      new webpack.HotModuleReplacementPlugin({}),
      new ImageMinimizerPlugin({
         minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
               plugins: [
                  ["jpegtran", { progressive: true }],
                  ["mozjpeg", { quality: 66 }],
            ],},
         },
      }),
   ],
};