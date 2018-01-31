var path = require('path');

module.exports = {
    context: path.resolve('src'),
    entry:"./main.js",
    output: {
        path: path.resolve('build/src/'),
        publicPath: '/public/assets/js',
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: 'public',
    },

    module: {
        loaders: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },

    watch: true
}
