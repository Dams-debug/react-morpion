const path = require("path");

module.exports = {
  entry: "./src/script/main.jsx",
  output: {
      path: path.resolve(__dirname, "public", "script"),
      filename: "main.bundle.js"
  },
  module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        },
        {
          test:/\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
  },
  mode: "development",
  watch: true
}