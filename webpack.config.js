var path = require('path')

module.exports = {
  entry: './src/game.js',
  devServer: {
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'static')],
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
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
