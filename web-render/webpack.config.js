//Ensure html-webpack-plugin is pre-installed via npm.
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const portFinderSync = require('portfinder-sync')
const path = require('path');

const infoColor = (_message) =>
{
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

module.exports = {
  // entry: {
  //   main: './src/index',
  //  /**
  //  /* object is passed to load script at global scope and exec immediately
  //  /* but if you don't need then simply do:
  //  /* myCustomScriptEntry: './src/myCustomScript'
  //  */
  //   myCustomScriptEntry: { 
  //     import: './src/field',
  //     library: {
  //       name: 'myCustomScriptEntry',
  //       type: 'var',
  //     },
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: [
          {
            loader: 'html-loader',
            // options: {minimise: true}
          }
        ]
      },
      {
        test: /.js?$/,
        loader: "babel-loader"
      },

      // Images
      {
        test: /\.(jpg|png|gif|svg|tif)$/,
        type: 'asset/resource',
        generator:
        {
          filename: 'assets/images/[hash][ext]'
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, './static') }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: "./index.html",
      // excludeChunks: ['myCustomScriptEntry']
    }),
  ],
  stats: 'errors-warnings',
  mode: 'development',
  infrastructureLogging:
  {
    level: 'warn',
  },
  devServer:
  {
    host: 'local-ip',
    port: portFinderSync.getPort(8080),
    open: true,
    https: false,
    allowedHosts: 'all',
    hot: false,
    watchFiles: ['src/**', 'static/**'],
    static:
    {
      watch: true,
      directory: path.join(__dirname, '../static')
    },
    client:
    {
      logging: 'none',
      overlay: true,
      progress: false
    },
    setupMiddlewares: function (middlewares, devServer) {
      console.log('------------------------------------------------------------')
      console.log(devServer.options.host)
      const port = devServer.options.port
      const https = devServer.options.https ? 's' : ''
      const domain1 = `http${https}://${devServer.options.host}:${port}`
      const domain2 = `http${https}://localhost:${port}`

      console.log(`Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`)

      return middlewares
    }
  }
};