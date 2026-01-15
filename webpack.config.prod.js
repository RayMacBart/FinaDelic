const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


module.exports = {
   mode: "production",
   entry: "./src/index.js",
   output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "public", "wholeApp"),
      publicPath: "/",
   },
   module: {
      rules: [
         {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: [
                     ['@babel/preset-env', {useBuiltIns: 'usage', corejs: { version: 3 }}]
                  ]
               }
            }
         }
      ]
   },
   plugins: [
      new CopyPlugin({
         patterns: [
            { from: "assets", to: "assets" },
            { from: "lib/fonts", to: "fonts" }
         ],
      }),
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
      new HtmlPlugin({
               template: 'src/index.html'
      }),
   ],
};