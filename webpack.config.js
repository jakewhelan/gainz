const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

module.exports = {
  entry: {
    vue: 'vue',
    index: resolve('./src/main.js')
  },
  output: {
    filename: '[name].js',
    path: resolve('dist')
  },
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'assets'),
      '@app': resolve(__dirname, 'src'),
      '@core': resolve(__dirname, 'src/core')
    }
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: file => (
      //     /node_modules/.test(file) &&
      //     !/\.vue\.js/.test(file)
      //   )
      // },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000' 
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin()
  ]
}