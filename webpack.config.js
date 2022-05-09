const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DevelopmentMode = process.env.NOVE_ENV === 'development';
const ProductionMode = !DevelopmentMode;
let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === ProductionMode) {
  mode = ProductionMode;
  target = 'browserslist';
}
const optimization = {
  minimize: true,
  usedExports: true,
  removeAvailableModules: true,
  removeEmptyChunks: true,
  mergeDuplicateChunks: true,
};
const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html',
  }),
  new MiniCssExtractPlugin({
    filename: './style/[name].[contenthash].css',
  }),
];

module.exports = {
  mode,
  plugins,
  target,
  optimization,
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['@babel/polyfill', './app.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: DevelopmentMode,
    compress: true,
    open: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
      },
    },
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src/js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === 'production' ? 'asset' : 'asset/resource',
        generator: {
          filename: '[path][contenthash][ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[path][contenthash][ext]',
        },
      },
      {
        test: /\.(json)$/i,
        type: 'asset/source',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript'],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
