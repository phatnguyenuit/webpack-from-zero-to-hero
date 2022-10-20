# webpack-from-zero-to-hero

Concept
Entry
Output
Loader
Plugin
Mode
Browser Compatibility
Environment
Entry -> Loader -> Plugins -> Output

Entry
Default -> src/index.js

There are multiple ways to define the entry property in your webpack configuration

Single entry (shorthand syntax)
module.exports = {
  entry: './path/to/my/entry/file.js',
};
The single entry syntax for the entry property is a shorthand for:

module.exports = {
  entry: {
    main: './path/to/my/entry/file.js',
  },
};
We can also pass an array of file paths to the entry property which creates what is known as a "multi-main entry". This is useful when you would like to inject multiple dependent files together and graph their dependencies into one "chunk".

module.exports = {
  entry: ['./src/file_1.js', './src/file_2.js'],
  output: {
    filename: 'bundle.js',
  },
};
Object syntax
Syntax: entry: {entryChunkName: string | string[]}

module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js',
    entryName: '/path/to/entry/file.js'
  },
};
You can pass empty object {} to entry when you have only entry points generated by plugins

EntryDescription object
An object of entry point description. You can specify the following properties.

dependOn: The entry points that the current entry point depends on. They must be loaded before this entry point is loaded.

filename: Specifies the name of each output file on disk.

import: Module(s) that are loaded upon startup.

library: Specify library options to bundle a library from current entry.

runtime: The name of the runtime chunk. When set, a new runtime chunk will be created. It can be set to false to avoid a new runtime chunk since webpack 5.43.0.

publicPath: Specify a public URL address for the output files of this entry when they are referenced in a browser. Also, see output.publicPath.

module.exports = {
  entry: {
    a2: 'dependingfile.js',
    b2: {
      dependOn: 'a2',
      import: './src/app.js',
    },
  },
};
runtime and dependOn should not be used together on a single entry, so the following config is invalid and would throw an error:

module.exports = {
  entry: {
    a2: './a',
    b2: {
      runtime: 'x2',
      dependOn: 'a2',
      import: './b',
    },
  },
};
Make sure runtime must not point to an existing entry point name, for example the below config would throw an error:

module.exports = {
  entry: {
    a1: './a',
    b1: {
      runtime: 'a1',
      import: './b',
    },
  },
};
Also dependOn must not be circular, the following example again would throw an error:

module.exports = {
  entry: {
    a3: {
      import: './a',
      dependOn: 'b3',
    },
    b3: {
      import: './b',
      dependOn: 'a3',
    },
  },
};
Output
The minimum requirement for the output property in your webpack configuration is to set its value to an object and provide an output.filename to use for the output file(s):

module.exports = {
  output: {
    filename: 'bundle.js',
  },
};
Multiple entry points

If your configuration creates more than a single "chunk" (as with multiple entry points or when using plugins like CommonsChunkPlugin), you should use substitutions to ensure that each file has a unique name.

module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};

// writes to disk: ./dist/app.js, ./dist/search.js
Loaders
Loaders are transformations that are applied to the source code of a module. They allow you to pre-process files as you import or “load” them. Thus, loaders are kind of like “tasks” in other build tools and provide a powerful way to handle front-end build steps. Loaders can transform files from a different language (like TypeScript) to JavaScript or load inline images as data URLs. Loaders even allow you to do things like import CSS files directly from your JavaScript modules!

Example

For example, you can use loaders to tell webpack to load a CSS file or to convert TypeScript to JavaScript. To do this, you would start by installing the loaders you need:

npm install --save-dev css-loader ts-loader
And then instruct webpack to use the css-loader for every .css file and the ts-loader for all .ts files:

module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
};
Using loaders

There are two ways to use loaders in your application:

Configuration (recommended): Specify them in your webpack.config.js file.
Inline: Specify them explicitly in each import statement.
Using configuration
module.rules allows you to specify several loaders within your webpack configuration. This is a concise way to display loaders, and helps to maintain clean code. It also offers you a full overview of each respective loader.

Loaders are evaluated/executed from right to left (or from bottom to top). In the example below execution starts with sass-loader, continues with css-loader and finally ends with style-loader. See "Loader Features" for more information about loaders order.

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // [style-loader](/loaders/style-loader)
          { loader: 'style-loader' },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // [sass-loader](/loaders/sass-loader)
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
Inline
It's possible to specify loaders in an import statement, or any equivalent "importing" method. Separate loaders from the resource with !. Each part is resolved relative to the current directory.

import Styles from 'style-loader!css-loader?modules!./styles.css';
Load css files with css-loader first, after that inject CSS to DOM by style-loader

Loader features

Loaders can be chained. Each loader in the chain applies transformations to the processed resource. A chain is executed in reverse order. The first loader passes its result (resource with applied transformations) to the next one, and so forth. Finally, webpack expects JavaScript to be returned by the last loader in the chain.
Loaders can be synchronous or asynchronous.
Loaders run in Node.js and can do everything that’s possible there.
Loaders can be configured with an options object (using query parameters to set options is still supported but has been deprecated).
Normal modules can export a loader in addition to the normal main via package.json with the loader field.
Plugins can give loaders more features.
Loaders can emit additional arbitrary files.
Loaders provide a way to customize the output through their preprocessing functions. Users now have more flexibility to include fine-grained logic such as compression, packaging, language translations and more.

Plugins
Plugins are the backbone of webpack. Webpack itself is built on the same plugin system that you use in your webpack configuration!

They also serve the purpose of doing anything else that a loader cannot do. Webpack provides many such plugins out of the box.

A webpack plugin is a JavaScript object that has an apply method. This apply method is called by the webpack compiler, giving access to the entire compilation lifecycle.

Example for simple plugin

const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('The webpack build process is starting!');
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
Usage:

Since plugins can take arguments/options, you must pass a new instance to the plugins property in your webpack configuration.

Depending on how you are using webpack, there are multiple ways to use plugins.

Examples:

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
Targets
Because JavaScript can be written for both server and browser, webpack offers multiple deployment targets that you can set in your webpack configuration.

To set the target property, you set the target value in your webpack config:

module.exports = {
  target: 'node',
};
The manifest
Webpack has internal manifest to identify which file is transpiled to.

We may need "webpack-manifest-plugin" to extract webpack manifest to our file

Code splitting