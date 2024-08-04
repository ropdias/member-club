const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  target: 'web',
  mode: 'development',

  entry: path.resolve(__dirname, 'src', 'main.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // clean dist before each build
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: true,  // Observa mudanças nos arquivos estáticos
    },
    port: 3000,
    open: true,
    liveReload: true,
    watchFiles: ['src/**/*.html'], // Observa mudanças nos arquivos HTML
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html', // Garante que o HTML seja gerado na pasta dist
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets'),
          to: path.resolve(__dirname, 'dist', 'assets'),
        },
      ],
    }),
    ...(devMode ? [] : [new MiniCssExtractPlugin()]), // Adding MiniCssExtractPlugin only in production
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource', // treats SVG files as resources
        generator: {
          filename: 'assets/[name][ext]', // defines the file name in the 'assets' folder
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
