# With TypeScript

Note that if you're already using [`babel-loader`](https://github.com/babel/babel-loader) to transpile your code, you can use [`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript) and let Babel handle both your JavaScript and TypeScript files instead of using an additional loader. 

Keep in mind that, contrary to `ts-loader`, the underlying [`@babel/plugin-transform-typescript`](https://babeljs.io/docs/en/babel-plugin-transform-typescript) plugin does not perform any type checking.