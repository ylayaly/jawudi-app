"use strict";
(() => {
var exports = {};
exports.id = 157;
exports.ids = [157];
exports.modules = {

/***/ 14300:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 82361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 57147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 13685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 95687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 71017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 85477:
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ 63477:
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 71576:
/***/ ((module) => {

module.exports = require("string_decoder");

/***/ }),

/***/ 57310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 73837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 59796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 3429:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7157);
/* harmony import */ var next_dist_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92800);
/* harmony import */ var next_dist_build_webpack_loaders_next_serverless_loader_api_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6249);

        
      const { processEnv } = __webpack_require__(19936)
      processEnv([{"path":".env.local","contents":"API_KEY=lDvS6hFJPOkH4o6Gqc51an6xq0OJmcRai6E7RY1j\nBUCKET=jawudi-my-test\nCLOUDFRONT=E2R3MLYHP2GZOA"},{"path":".env","contents":"BUCKET=jawudi-my-test\nCLOUDFRONT=E2R3MLYHP2GZOA"}])
    
        
        const runtimeConfig = {}
        ;
        

        

        const rewrites = Array.isArray(private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg)
          ? {
            afterFiles: private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg
          }
          : private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg

        const apiHandler = (0,next_dist_build_webpack_loaders_next_serverless_loader_api_handler__WEBPACK_IMPORTED_MODULE_2__/* .getApiHandler */ .Y)({
          pageModule: __webpack_require__(87676),
          rewrites: rewrites,
          i18n: undefined,
          page: "/api/preview",
          basePath: "",
          pageIsDynamic: false,
          encodedPreviewProps: {previewModeId:"306d4089514c3b008fc17e20a442fcb2",previewModeSigningKey:"0dbcb099c43db1ab865a69906651a9365ac194866a2b759327ff57de90bff1f5",previewModeEncryptionKey:"3591cc0b65a02778d35bef24d3d97893e48136eabd5ccb3c61e49ea144781321"}
        })
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiHandler);
      

/***/ }),

/***/ 87676:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _prismicio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94147);
/* harmony import */ var _prismicio_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9928);


const preview = async (req, res)=>{
    const client = (0,_prismicio__WEBPACK_IMPORTED_MODULE_0__/* .createClient */ .eI)({
        req
    });
    await (0,_prismicio_next__WEBPACK_IMPORTED_MODULE_1__/* .setPreviewData */ .mf)({
        req,
        res
    });
    await (0,_prismicio_next__WEBPACK_IMPORTED_MODULE_1__/* .redirectToPreviewURL */ .uG)({
        req,
        res,
        client,
        linkResolver: _prismicio__WEBPACK_IMPORTED_MODULE_0__/* .linkResolver */ .kG
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (preview);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [458,928,800,147], () => (__webpack_exec__(3429)));
module.exports = __webpack_exports__;

})();