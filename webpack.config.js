const path = require('path');
const HandlebarsPlugin = require('handlebars-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/goit-js-hw-13-image-finder/',
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },

      { test: /\.(handlebars|hbs)$/, loader: 'handlebars-loader' },
    ],
  },

  plugins: [
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), 'src', '*.hbs'),

      output: path.join(process.cwd(), 'dist', '[name].html'),

      // data passed to main hbs template: `main-template(data)`
      //   data: require('./app/data/project.json'),
      // or add it as filepath to rebuild data on change using webpack-dev-server
      //   data: path.join(__dirname, 'app/data/project.json'),

      // globbed path to partials, where folder/filename is unique
      //   partials: [
      //     path.join(process.cwd(), 'app', 'src', 'components', '*', '*.hbs'),
      //   ],

      // register custom helpers. May be either a function or a glob-pattern
      //   helpers: {
      //     nameOfHbsHelper: Function.prototype,
      //     projectHelpers: path.join(
      //       process.cwd(),
      //       'app',
      //       'helpers',
      //       '*.helper.js',
      //     ),
      //   },
    }),
  ],
};
