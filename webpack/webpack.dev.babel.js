/**
 * Webpack dev config
 */
module.exports = (function() {
  const path = require("path");
  const webpack = require("webpack");
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const CircularDependencyPlugin = require("circular-dependency-plugin");
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

  return require("./webpack.base.babel")({
    mode: "development",

    // Add hot reloading in development
    entry: [
      require.resolve("react-app-polyfill/ie11"),
      "webpack-hot-middleware/client?reload=true",
      path.join(process.cwd(), "client/main.js"), // Start with js/app.js
    ],

    // Don't use hashes in dev mode for better performance
    output: {
      filename: "[name].js",
      chunkFilename: "[name].chunk.js",
    },

    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: Infinity,
        name: true,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace("@", "")}`;
            },
          },
          main: {
            chunks: "all",
            minChunks: 2,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    },

    // Add development plugins
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
      new HtmlWebpackPlugin({
        inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
        template: "client/index.html",
      }),
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/, // exclude node_modules
        failOnError: false, // show a warning when there is a circular dependency
      }),
      new BundleAnalyzerPlugin(),
    ],

    // Emit a source map for easier debugging
    // See https://webpack.js.org/configuration/devtool/#devtool
    devtool: "eval-source-map",

    performance: {
      hints: false,
    },
  });
}());
