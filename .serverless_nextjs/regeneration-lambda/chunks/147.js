"use strict";
exports.id = 147;
exports.ids = [147];
exports.modules = {

/***/ 94147:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "eI": () => (/* binding */ createClient),
  "kG": () => (/* binding */ linkResolver)
});

// UNUSED EXPORTS: endpoint, repositoryName

// EXTERNAL MODULE: ./node_modules/@prismicio/client/dist/index.js + 2 modules
var dist = __webpack_require__(76364);
// EXTERNAL MODULE: ./node_modules/@prismicio/next/dist/index.js
var next_dist = __webpack_require__(9928);
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


/***/ })

};
;