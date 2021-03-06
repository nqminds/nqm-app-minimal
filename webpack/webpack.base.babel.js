/**
 * Common webpack conf between dev and production
 */
module.exports = (function(options) {
  const path = require("path");
  const webpack = require("webpack");

  return {
    mode: options.mode,
    entry: options.entry,
    output: Object.assign(
      {
        path: path.resolve(process.cwd(), "dist"),
        publicPath: "/",
      },
      options.output,
    ),
    optimization: {
      splitChunks: {
        chunks: "all",
        minChunks: 2,
        maxAsyncRequests: 5,
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
      ...options.optimization,
    },
    module: {
      rules: [
        {
          test: /\.js$/, // Transform all .js files required somewhere with Babel
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: options.babelQuery,
          },
        },
        {
          // Preprocess our own .css files
          // This is the place to add your own loaders (e.g. sass/less etc.)
          // for a list of loaders, see https://webpack.js.org/loaders/#styling
          test: /\.css$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader"],
        },
        {
          // Preprocess 3rd party .css files located in node_modules
          test: /\.css$/,
          include: /node_modules/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          use: "file-loader",
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "svg-url-loader",
              options: {
                // Inline files smaller than 10 kB
                limit: 10 * 1024,
                noquotes: true,
              },
            },
          ],
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                // Inline files smaller than 10 kB
                limit: 10 * 1024,
              },
            },
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  enabled: false,
                  // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                  // Try enabling it in your environment by switching the config to:
                  // enabled: true,
                  // progressive: true,
                },
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                pngquant: {
                  quality: "65-90",
                  speed: 4,
                },
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: "html-loader",
        },
      ],
    },
    plugins: options.plugins.concat([
      // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
      // inside your code for any environment checks; Terser will automatically
      // drop any unreachable code.
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    ]),
    resolve: {
      modules: ["node_modules", "client"],
      extensions: [".js", ".jsx", ".react.js"],
      mainFields: ["browser", "jsnext:main", "main"],
      alias: {
        Modules: path.resolve(process.cwd(), "client/modules"),
        Configs: path.resolve(process.cwd(), "client/configs"),
      },
    },
    devtool: options.devtool,
    target: "web", // Make web variables accessible to webpack, e.g. window
    performance: options.performance || {},
  };
});
