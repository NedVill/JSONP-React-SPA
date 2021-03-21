const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugins = require('eslint-webpack-plugin');

module.exports = (env = {}) => {

  const { mode = 'development' } = env;

  const isProd = mode === 'production';
  const isDev = mode === 'development';

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader'
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: 'React app',
        template: 'public/index.html'
      }),
      new ESLintPlugins({
        extensions: ["js", "jsx", "ts", "tsx"],
      }),
    ];

    if (isProd) {
      plugins.push(new MiniCssExtractPlugin({
          filename: 'main-[hash:8].css'
        })
      );
    }

    return plugins;
  };

  return {
    mode: isProd ? 'production': isDev && 'development',

    output: {
      filename: isProd ? 'main-[hash:8].js' : undefined,
      publicPath: '/',
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },

    module: {
      rules: [

      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },

      // Loading images
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name]-[sha1:hash:7].[ext]'
            }
          }
        ]
      },

      // Loading fonts
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          }
        ]
      },

      // Loading CSS
      {
        test: /\.(css)$/,
        use: getStyleLoaders()
      },

      // Loading SASS/SCSS
      {
        test: /\.(s[ca]ss)$/,
        use: [ ...getStyleLoaders(), 'sass-loader' ]
      }

    ]
    },

    plugins: getPlugins(),

    devServer: {
      open: true,
      historyApiFallback: true,
    }
  };
};
