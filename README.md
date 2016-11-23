# resx-webpack-loader

Thanks to Luke Howard, @binaryluke for his package jsonfromresx.

The important stuff:
```javascript
module.exports = {
    ...
    resolveLoader: {
      alias: {
        'resx-loader': path.join(__dirname, './node_modules/resx-loader')
      },
      modulesDirectories: [
        path.resolve(__dirname, './node_modules/')
      ]
    },
    module: {
        loaders: [
            {
              test: [/\.resx$/], loader: 'resx-loader'
            }
        ]
    }
    ...
};
```

The entire webpack config object of an example use case. Example project can be found at https://github.com/slimeygecko/dojo-webpack-example

```javascript
module.exports = {
    entry: './src/dgrid_01_hello',
    resolveLoader: {
      alias: {
        "dojo/text": 'raw-loader',
        'resx-loader': path.join(__dirname, './resx-loader')
      },
      modulesDirectories: [
        path.resolve(__dirname, './node_modules/')
      ]
    },
    resolve: {
      alias: {
          "dojo": path.resolve(__dirname, './node_modules/dojo'),
          "dstore": path.resolve(__dirname, './node_modules/dstore'),
          "dijit": path.resolve(__dirname, './node_modules/dijit'),
          "dgrid": path.resolve(__dirname, './node_modules/dgrid')
      },
      root: [
        path.resolve(__dirname, './src'),
      ]
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/wtl\/nls/, function(result) {
          // wtl/nls!resourceFile,resourceFile2   =>   ../src/wtl/nls?resourceFile,resourceFile2
          result.request = '../src/' + result.request.replace('!', '?')
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "dojo-webpack-loader",
            },
            {
              test: [/\.resx$/], loader: 'resx-loader'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'bundle/'),
        publicPath: "bundle/",
        filename: "[name].bundle.js"
    },
    dojoWebpackLoader: {
        // We should specify paths to core and dijit modules because we using both
        dojoCorePath: path.resolve(__dirname, './node_modules/dojo'),
        dojoDijitPath: path.resolve(__dirname, './node_modules/dijit'),

        // Languages for dojo/nls module which will be in result pack.
        includeLanguages: ['en', 'ru', 'fr']
    }
};
```
