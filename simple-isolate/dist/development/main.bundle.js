"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["main"],{

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendors_vendor_a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vendors/vendor-a */ "./vendors/vendor-a.js");
/* harmony import */ var _vendors_vendor_a__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vendors_vendor_a__WEBPACK_IMPORTED_MODULE_0__);


(() => {
  const print = (severity, ...args) => {
    console.log(`[${severity}]`, 'Print with args');
    console.log(`[${severity}]`, ...args);
  };

  print('INFO', 1, 2, 3, 5, 'OK?');
})();


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./index.js"));
/******/ }
]);