const Path = require('path');
const util = require('util');
const {
  JavascriptWebpackConfig,
  CssWebpackConfig,
} = require('@silverstripe/webpack-config');

const PATHS = {
  ROOT: Path.resolve(),
  SRC: Path.resolve('client/src'),
};

const cssWebpackConfig = new CssWebpackConfig('css', PATHS)
  .setEntry({
    bundle: `${PATHS.SRC}/styles/bundle.scss`,
  })
  .getConfig();

const jsWebpackConfig = new JavascriptWebpackConfig('js', PATHS)
  .setEntry({
    bundle: `${PATHS.SRC}/bundles/bundle.js`,
  })
  .getConfig()

// console.log(util.inspect(cssWebpackConfig, {showHidden: false, depth: null, colors: true}))
jsWebpackConfig.module.rules.push({
  test: /\.css$/i,
  use: ["style-loader", "css-loader"],
});

console.log(util.inspect(jsWebpackConfig, {showHidden: false, depth: null, colors: true}))

const config = [
  // main JS bundle
  jsWebpackConfig,
  // sass to css
  cssWebpackConfig
];

// Use WEBPACK_CHILD=js or WEBPACK_CHILD=css env var to run a single config
module.exports = process.env.WEBPACK_CHILD
  ? config.find((entry) => entry.name === process.env.WEBPACK_CHILD)
  : config;
