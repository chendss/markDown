var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
const lessToJs = require('less-vars-to-js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HappyPack = require('happypack');
const pkgJson = require('./package');
//引入压缩js的文件
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const configObj = pkgJson.config['' + process.env.ENV];
const publicPath = configObj.publicPath;
const CDN_BASE = configObj.CDN_BASE;
console.log('开始打包 ENV:', process.env.ENV, 'publicPath:', publicPath);

//转换 less 变量,用于主题
let themer = lessToJs(fs.readFileSync(path.join(__dirname, './src/themes/theme.less'), 'utf8'));
Object.keys(themer).map((k, i) => {
  themer[k] = JSON.stringify(themer[k]);
})
themer['hd'] = '2px'
const lessVars = Object.assign(themer, { "@CDN_BASE": JSON.stringify(CDN_BASE) });

process.noDeprecation = true;
var plugins = [
  new ProgressBarPlugin(),
  new HappyPack({
    id: 'jsx',
    threads: 4,
    cache: true,
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          "presets": [
            [
              "latest",
              {
                "loose": true,
                "modules": false
              }
            ],
            "react",
            "es2015",
            "stage-0"
          ],
          plugins: [
            "transform-decorators-legacy",
            "transform-class-properties",
            "transform-object-rest-spread",
            ["import", { libraryName: "antd-mobile", style: true }],
            //模块化按需加载
            ["babel-plugin-imports-transform", {
              "yx-widget": {
                "transform": "yx-widget/component/${member-lowercase}",
                "preventFullImport": true,
                "style": "yx-widget/component/${member-lowercase}/index.less",
              },
              //"next": {
              //  "transform": "yx-widget/component/${member-lowercase}",
              //  "preventFullImport": true,
              //  "style": "yx-widget/component/${member-lowercase}/index.less",
              //}
            }]
          ]
        }
      }
    ]
  }),
  new HappyPack({
    id: 'less',
    threads: 4,
    loaders: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: '[local]' //[local]___[hash:base64:5]
        }
      },
      'postcss-loader',
      {
        loader: 'less-loader',
        options: {
          modifyVars: lessVars,
          javascriptEnabled: true,
        }
      }
    ],
  }),
  new CopyWebpackPlugin([
    { from: './dll', to: 'dll' },
    { from: path.resolve(__dirname, './src/assets'), to: 'assets', ignore: ['.*'] },
  ]),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    favicon: 'src/assets/favicon.ico',
    showErrors: true,
    CDN_BASE: CDN_BASE,
    publicPath: publicPath,
    W_ENV: process.env.ENV,
    hash: true,
    template: path.join(__dirname, 'src/index.html')
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'prod:dev')
    },
    "ENV": JSON.stringify(process.env.ENV || 'dev'),
    "CDN_BASE": JSON.stringify(CDN_BASE || ''),
  }),
  //提升模块化的性能
  new webpack.optimize.ModuleConcatenationPlugin(),
]

if ('loc' !== '' + process.env.ENV) {
  // const releasePath = path.resolve(__dirname, "../../resources/static/module");
  const releasePath = path.resolve(__dirname, "dist");
  plugins.push(
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      filename: '[name].js',
    }),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      // 传递给 UglifyJS的参数如下：
      uglifyJS: {
        output: {
          /*
           是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
           可以设置为false
           */
          beautify: false,
          /*
           是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
           */
          comments: false
        },
        /*
         是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
         不大的警告
         */
        warnings: false,
        compress: {
          /*
           是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
           */
          drop_console: true,
          /*
           是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
           转换，为了达到更好的压缩效果，可以设置为false
           */
          collapse_vars: false,
          /*
           是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
           var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
           */
          reduce_vars: false
        }
      }
    })
  )
} else {
  plugins.push(
    new OpenBrowserPlugin({ url: 'http://localhost:3001' }),
    new ExtractTextPlugin('[name].css?[hash]'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dll/manifest.json')
    })
  )
}

module.exports = {
  entry: {
    // 'babel-polyfill': 'babel-polyfill',
    app: [
      './src/index.js'
    ],
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: publicPath,
    chunkFilename: '[name].[chunkhash:8].js'
  },
  devtool: 'loc' !== '' + process.env.ENV ? false : 'cheap-module-source-map',
  plugins,
  resolve: {
    alias: {
      pages: path.join(__dirname, 'src/pages'),
      widget: path.join(__dirname, 'src/widget'),
      router: path.join(__dirname, 'src/router'),
      utils: path.join(__dirname, 'src/utils'),
      assets: path.join(__dirname, 'src/assets'),
      themes: path.join(__dirname, 'src/themes'),
      config: path.join(__dirname, 'src/config'),
      components: path.join(__dirname, 'src/components'),
    },
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: [".js", ".jsx", '.less', '.css']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'happypack/loader?id=jsx',
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules)/
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'happypack/loader?id=less'
        })
      },
      {
        test: /\.(xml|bpmn)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1
          }
        }]
      },
      {
        test: /\.(png|jpg|gif|md)$/,
        use: ['file-loader?limit=10000&name=[md5:hash:base64:10].[ext]']
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=images/svg+xml']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  devServer: { // webpack-dev-server配置热更新以及跨域
    historyApiFallback: true, //不跳转
    noInfo: true,
    inline: true, // 实时刷新
    host: '0.0.0.0',
    port: '3001', // 不指定固定端口
    hot: true,
    // proxy: {
    //   "**": "/",
    //   changeOrigin: true
    // }
  },
};