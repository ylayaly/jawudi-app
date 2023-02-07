"use strict";
exports.id = 362;
exports.ids = [362];
exports.modules = {

/***/ 68357:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HQ": () => (/* binding */ ContextProvider),
/* harmony export */   "bp": () => (/* binding */ useAppContext)
/* harmony export */ });
/* unused harmony export AppContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);


const AppContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const useAppContext = ()=>{
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AppContext);
};
const ContextProvider = ({ children  })=>{
    const { 0: countries , 1: setCountries  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: detailFund , 1: setDetailFund  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: goals , 1: setGoals  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: showCallQR , 1: setShowCallQR  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: inputFocus , 1: setInputFocus  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: legaPages , 1: setLegaPages  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: openLegal , 1: setOpenLegal  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const addCountries = (d)=>{
        const data = d && d.data && d.data.country ? d.data.country : [];
        data.map((c)=>{
            return {
                name: c.name,
                code: c.currencyCode,
                show: true,
                symbol: c.currencySymbol
            };
        });
        setCountries(data);
    };
    const changeDetailFund = (current)=>{
        setDetailFund(current);
    };
    const addGoals = (all)=>{
        setGoals(all);
    };
    const changeCallQR = (show)=>{
        setShowCallQR(show);
    };
    const focused = (f)=>{
        setInputFocus(f);
    };
    const openedLegal = (l)=>{
        setOpenLegal(l);
    };
    const addLegalPages = (pages)=>{
        setLegaPages(pages);
    };
    const store = {
        countries,
        addCountries,
        detailFund,
        changeDetailFund,
        goals,
        addGoals,
        showCallQR,
        changeCallQR,
        inputFocus,
        focused,
        openLegal,
        openedLegal,
        legaPages,
        addLegalPages
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AppContext.Provider, {
        value: store,
        children: children
    });
};


/***/ }),

/***/ 38484:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _prismicio_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(74776);
/* harmony import */ var _prismicio_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(62055);
/* harmony import */ var _prismicio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(95228);
/* harmony import */ var _context_appContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(68357);








function InternalLink({ href , children , ...props }) {
    if (href.includes("/legal/")) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
            href: "#",
            "data-href": href.split("/")[2],
            ...props,
            children: children
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: href,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
            ...props,
            children: children
        })
    });
}
function App({ Component , pageProps  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_prismicio_react__WEBPACK_IMPORTED_MODULE_5__/* .PrismicProvider */ .cp, {
        linkResolver: _prismicio__WEBPACK_IMPORTED_MODULE_3__/* .linkResolver */ .kG,
        internalLinkComponent: InternalLink,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_prismicio_next__WEBPACK_IMPORTED_MODULE_2__/* .PrismicPreview */ .NF, {
            repositoryName: _prismicio__WEBPACK_IMPORTED_MODULE_3__/* .repositoryName */ .AF,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_context_appContext__WEBPACK_IMPORTED_MODULE_4__/* .ContextProvider */ .HQ, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                    ...pageProps
                })
            })
        })
    });
};


/***/ }),

/***/ 95228:
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
var next_dist = __webpack_require__(62055);
;// CONCATENATED MODULE: ./sm.json
const sm_namespaceObject = JSON.parse('{"_d":"https://jawudi.prismic.io/api/v2"}');
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
        case "post":
            return `/ideas/${doc.uid}`;
        case "legalPage":
            return `/legal/${doc.uid}`;
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

/***/ 97020:
/***/ ((module) => {

module.exports = JSON.parse('{"polyfillFiles":["static/chunks/polyfills-5cd94c89d3acac5f.js"],"devFiles":[],"ampDevFiles":[],"lowPriorityFiles":["static/Bqy6J6A9HsSY5U7gkaiEq/_buildManifest.js","static/Bqy6J6A9HsSY5U7gkaiEq/_ssgManifest.js","static/Bqy6J6A9HsSY5U7gkaiEq/_middlewareManifest.js"],"pages":{"/":["static/chunks/webpack-42cdea76c8170223.js","static/chunks/framework-4556c45dd113b893.js","static/chunks/main-fc7d2f0e2098927e.js","static/chunks/75fc9c18-e61c2e0d9c9a0957.js","static/chunks/648-6d45e35da2243291.js","static/chunks/166-73258ff349723487.js","static/chunks/169-3b6c53729ae35acc.js","static/chunks/283-f66326a640884605.js","static/chunks/pages/index-aff16099663d1184.js"],"/[uid]":["static/chunks/webpack-42cdea76c8170223.js","static/chunks/framework-4556c45dd113b893.js","static/chunks/main-fc7d2f0e2098927e.js","static/chunks/75fc9c18-e61c2e0d9c9a0957.js","static/chunks/648-6d45e35da2243291.js","static/chunks/166-73258ff349723487.js","static/chunks/169-3b6c53729ae35acc.js","static/chunks/283-f66326a640884605.js","static/chunks/pages/[uid]-812ce696d76e33f7.js"],"/_app":["static/chunks/webpack-42cdea76c8170223.js","static/chunks/framework-4556c45dd113b893.js","static/chunks/main-fc7d2f0e2098927e.js","static/css/dc4e43d139aea62a.css","static/chunks/pages/_app-45ab0c746ae12ed0.js"],"/_error":["static/chunks/webpack-42cdea76c8170223.js","static/chunks/framework-4556c45dd113b893.js","static/chunks/main-fc7d2f0e2098927e.js","static/chunks/pages/_error-0a004b8b8498208d.js"],"/ideas/[uid]":["static/chunks/webpack-42cdea76c8170223.js","static/chunks/framework-4556c45dd113b893.js","static/chunks/main-fc7d2f0e2098927e.js","static/chunks/75fc9c18-e61c2e0d9c9a0957.js","static/chunks/648-6d45e35da2243291.js","static/chunks/166-73258ff349723487.js","static/chunks/169-3b6c53729ae35acc.js","static/chunks/pages/ideas/[uid]-c44b83fbf8ff14b4.js"],"/slice-simulator":["static/chunks/webpack-42cdea76c8170223.js","static/chunks/framework-4556c45dd113b893.js","static/chunks/main-fc7d2f0e2098927e.js","static/chunks/75fc9c18-e61c2e0d9c9a0957.js","static/chunks/648-6d45e35da2243291.js","static/chunks/681-3c2d2867d2a2cc03.js","static/chunks/166-73258ff349723487.js","static/chunks/pages/slice-simulator-34528f2772fdbaff.js"]},"ampFirstPages":[]}');

/***/ }),

/***/ 73978:
/***/ ((module) => {

module.exports = JSON.parse('{"../node_modules/@formspree/react/dist/index.mjs -> @stripe/react-stripe-js":{"id":6664,"files":[]}}');

/***/ }),

/***/ 59450:
/***/ ((module) => {

module.exports = {"Dg":[]};

/***/ })

};
;