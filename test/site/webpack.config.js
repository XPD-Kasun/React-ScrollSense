const path = require('path');

module.exports = {
       entry: './app.js',
       mode: 'development',
       output: {
              path: path.join(__dirname, 'dist'),
              filename: 'dist.js',
       },
       devtool: 'eval-source-map',
       module: {
              rules: [
                     {
                            test: /\.m?js$/,
                            exclude: /node_modules/,
                            use: {
                                   loader: "babel-loader",
                                   options: {
                                          presets: ["@babel/preset-env", ["@babel/preset-react", { "runtime": "automatic" }]]
                                   }
                            }
                     },
                     {
                            test: /\.css/i,
                            exclude: /node_modules/,
                            use: ["style-loader", 'css-loader']
                     }
              ]
       },
       devServer: {
              static: {
                     directory: path.join(__dirname, 'dist'),
              },
              watchFiles: ['./app.js'],
              liveReload: true,
              compress: true,
              port: 7000,
              historyApiFallback: {
                     index: 'index.html'
              }
       },
       resolve: {
              alias: {
                     react: path.resolve('./node_modules/react'),
              }
       }
};