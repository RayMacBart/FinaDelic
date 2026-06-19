const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


const source = 'out';
// const source = 'in';

// const destination = `dist_${source}`;
const destination = `public`;

module.exports = {
   mode: "production",
   entry: "./src_"+source+"/index.js",
   // entry: "./dist/PWreset.js",
   output: {
      filename: "bundle_"+source+".js",
      // filename: "PWreset.js",
      path: path.resolve(__dirname, destination),
      publicPath: "/",
      // clean: true
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
   optimization: {
      splitChunks: false,
      runtimeChunk: false,
      concatenateModules: true,
   },
   plugins: [
      // new CopyPlugin({
      //    patterns: [
      //       // { from: path.resolve(__dirname, 'src_'+source, 'main.css'), to: "main.css" },
      //       { from: path.resolve(__dirname, 'src_'+source, 'assets'), to: "assets" },
      //       { from: path.resolve(__dirname, 'src_'+source, 'assets', 'icons'), to: "assets/icons" },
      //       { from: "lib/fonts", to: "fonts" },
      //    ],
      // }),
      // new ImageMinimizerPlugin({
      //    minimizer: {
      //       implementation: ImageMinimizerPlugin.imageminMinify,
      //       options: {
      //          plugins: [
      //             ["jpegtran", { progressive: true }],
      //             ["mozjpeg", { quality: 66 }],
      //       ],},
      //    },
      // }),
      new ImageMinimizerPlugin({
         minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
               plugins: [
               ["jpegtran", { progressive: true }],
               ["mozjpeg", { quality: 66 }],
               ],
            },
         },
         generator: [
            {
               type: "asset",
               implementation: ImageMinimizerPlugin.imageminGenerate,
               options: {
               plugins: [
                  ["jpegtran", { progressive: true }],
                  ["mozjpeg", { quality: 66 }],
               ],
               },
            },
         ],
         }),
      // new HtmlPlugin({
      //          template: 'src_'+source+'/index.html'
      // }),
   ],
};