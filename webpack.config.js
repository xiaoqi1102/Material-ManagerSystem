/**
 * Created by yzsoft on 16/3/16.
 */
var path = require('path');
const webpack=require('webpack');
module.exports = {
    entry: [
        /*  'webpack/hot/dev-server',
         'webpack-dev-server/client?http://localhost:8080',*/
        path.resolve(__dirname, 'js/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    devtool:'eval-source-map',
  /*  devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },*/
    plugins:[
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:'jquery',
            "window.jQuery":"jquery",
            moment:'moment'
        }),
       /* new webpack.HotModuleReplacementPlugin()*/
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }

};