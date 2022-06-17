"use strict";
exports.id = 362;
exports.ids = [362];
exports.modules = {

/***/ 8484:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _prismicio_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4776);
/* harmony import */ var _prismicio_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2055);
/* harmony import */ var _prismicio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5228);

// import '../styles/globals.css'





function App({ Component , pageProps  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_prismicio_react__WEBPACK_IMPORTED_MODULE_4__/* .PrismicProvider */ .cp, {
        linkResolver: _prismicio__WEBPACK_IMPORTED_MODULE_3__/* .linkResolver */ .kG,
        internalLinkComponent: ({ href , children , ...props })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                href: href,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    ...props,
                    children: children
                })
            })
        ,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_prismicio_next__WEBPACK_IMPORTED_MODULE_2__/* .PrismicPreview */ .NF, {
            repositoryName: _prismicio__WEBPACK_IMPORTED_MODULE_3__/* .repositoryName */ .AF,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                ...pageProps
            })
        })
    });
};


/***/ }),

/***/ 5228:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "eI": () => (/* binding */ createClient),
  "kG": () => (/* binding */ linkResolver),
  "AF": () => (/* binding */ repositoryName)
});

// UNUSED EXPORTS: endpoint

// EXTERNAL MODULE: ./node_modules/@prismicio/client/dist/index.js
var dist = __webpack_require__(8468);
// EXTERNAL MODULE: ./node_modules/@prismicio/next/dist/index.js
var next_dist = __webpack_require__(2055);
;// CONCATENATED MODULE: ./sm.json
const sm_namespaceObject = JSON.parse('{"_d":"https://jawudi-app.prismic.io/api/v2"}');
;// CONCATENATED MODULE: ./prismicio.js



const endpoint = sm_namespaceObject._d;
const repositoryName = dist/* getRepositoryName */._k(endpoint);
// Update the Link Resolver to match your project's route structure
function linkResolver(doc) {
    switch(doc.type){
        case "homepage":
            return "/";
        case "page":
            return `/${doc.uid}`;
        default:
            return null;
    }
}
// This factory function allows smooth preview setup
function createClient(config = {}) {
    const client = dist/* createClient */.eI(endpoint, {
        ...config
    });
    (0,next_dist/* enableAutoPreviews */.Lu)({
        client,
        previewData: config.previewData,
        req: config.req
    });
    return client;
}


/***/ }),

/***/ 7020:
/***/ ((module) => {

module.exports = JSON.parse('{"polyfillFiles":["static/chunks/polyfills-5cd94c89d3acac5f.js"],"devFiles":[],"ampDevFiles":[],"lowPriorityFiles":["static/WjmvkhZshFxEVzSB3vEp5/_buildManifest.js","static/WjmvkhZshFxEVzSB3vEp5/_ssgManifest.js","static/WjmvkhZshFxEVzSB3vEp5/_middlewareManifest.js"],"pages":{"/":["static/chunks/webpack-9b312e20a4e32339.js","static/chunks/framework-4556c45dd113b893.js","static/chunks/main-fc7d2f0e2098927e.js","static/chunks/pages/index-d27d60166eb39e69.js"],"/[uid]":["static/chunks/webpack-9b312e20a4e32339.js","static/chunks/framework-4556c45dd113b893.js","static/chunks/main-fc7d2f0e2098927e.js","static/chunks/pages/[uid]-8bc2bbe1579ea9ef.js"],"/_app":["static/chunks/webpack-9b312e20a4e32339.js","static/chunks/framework-4556c45dd113b893.js","static/chunks/main-fc7d2f0e2098927e.js","static/css/3796a3afe9d59d89.css","static/chunks/pages/_app-deff1ac5d015656c.js"],"/_error":["static/chunks/webpack-9b312e20a4e32339.js","static/chunks/framework-4556c45dd113b893.js","static/chunks/main-fc7d2f0e2098927e.js","static/chunks/pages/_error-0a004b8b8498208d.js"]},"ampFirstPages":[]}');

/***/ }),

/***/ 3978:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 9450:
/***/ ((module) => {

module.exports = {"Dg":[]};

/***/ })

};
;