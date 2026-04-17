// webpack.config.js (development)
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");

// const source = 'out';
const source = 'in';

// const destination = `dist_${source}`;
const destination = 'public';

module.exports = {
   mode: "development",
   entry: "./src_"+source+"/index.js",
   output: {
      filename: `bundle_${source}.js`,
      path: path.resolve(__dirname, destination),
      publicPath: '/',
      // clean: true,
   },
   resolve: {
      extensions: ['.ts', '.js', '.json']
   },
   module: {
      rules: [
         {
            test: /\.[jt]sx?$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: [
                     ['@babel/preset-env', {useBuiltIns: 'usage', corejs: { version: 3 }}],
                      '@babel/preset-typescript'
                     
                  ]
               }
            }
         }
      ]
   },
   devServer: {
      static: {
         directory: path.join(__dirname, destination),
      },
      compress: true,
      port: 8080,
      devMiddleware: {
         index: true,
         mimeTypes: { phtml: 'text/html' },
         publicPath: '/',
         serverSideRender: true,
         writeToDisk: true,
      },
      historyApiFallback: true,
   },
   // devtool: "eval-cheap-module-source-map",
   devtool: false,
   plugins: [
      // new CopyPlugin({
      //    patterns: [
      //       // { from: path.resolve(__dirname, 'src_'+source, 'assets'), to: "assets" },
      //       // { from: path.resolve(__dirname, 'src_'+source, 'assets', 'icons'), to: "assets/icons" },
      //       // { from: "lib/fonts", to: "fonts" },
      //       // { from: path.resolve(__dirname, 'src_'+source, 'main.css'), to: `main_${source}.css` },
      //       // { from: path.resolve(__dirname, 'src_'+source, 'main.css'), to: `main.css` },
      //    ],
      // }),
      // new HtmlPlugin({
      //    template: 'src_'+source+`/index_${source}.html`,
      //    inject: false,
      // }),
      new ForkTsCheckerWebpackPlugin({
         async: false, // fail build on type errors; set true to run checks async
         typescript: {
         configFile: path.resolve(__dirname, 'tsconfig.frontend.json')
         }
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