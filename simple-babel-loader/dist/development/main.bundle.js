/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./simple-babel-loader/index.js ***!
  \**************************************/
(function () {
  var print = function print(severity) {
    var _console;
    console.log("[".concat(severity, "]"), 'Print with args');
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    (_console = console).log.apply(_console, ["[".concat(severity, "]")].concat(args));
  };
  print('INFO', 1, 2, 3, 5, 'OK?');
})();
/******/ })()
;