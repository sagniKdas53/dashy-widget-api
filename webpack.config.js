const path = require('path');
const webpack = require('webpack');

// For chart.js
const chart_callback = process.env.chart_callback || 10000;
const chart_data_points = process.env.chart_data_points || 12;
// Essentials
const protocol = process.env.protocol || "http";
const host = process.env.host || "localhost";
const port = process.env.port || 64567;
const url_base = process.env.base_url || "/temp";

if (process.env.hide_ports) url = `${protocol}://${host}${url_base}`;
else url = `${protocol}://${host}:${port}${url_base}`;

module.exports = {
  entry: './chart.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  entry: './getemp.js',
  output: {
    filename: 'getemp.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __URL__: JSON.stringify(url),
      __SIZE__: JSON.stringify(chart_data_points),
      __INTERVAL__: JSON.stringify(chart_callback)
    })
  ]
};
