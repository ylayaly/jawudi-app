exports.id = 928;
exports.ids = [928];
exports.modules = {

/***/ 9928:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Lu": () => (/* binding */ enableAutoPreviews),
/* harmony export */   "_H": () => (/* binding */ exitPreview),
/* harmony export */   "mf": () => (/* binding */ setPreviewData),
/* harmony export */   "uG": () => (/* binding */ redirectToPreviewURL)
/* harmony export */ });
/* unused harmony exports PrismicNextImage, PrismicPreview */
/* harmony import */ var _prismicio_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(76364);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60763);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96821);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(45525);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);







function setPreviewData({ req, res }) {
  const ref = req.query.token || req.cookies[_prismicio_client__WEBPACK_IMPORTED_MODULE_3__/* .cookie.preview */ .pR.preview];
  if (ref) {
    res.setPreviewData({ ref });
  }
}

function exitPreview(config) {
  config.res.clearPreviewData();
  config.res.json({ success: true });
}

const readValue = (value) => {
  return value.replace(/%3B/g, ";");
};
const getCookie = (name, cookieJar) => {
  const cookies = cookieJar.split("; ");
  for (const cookie of cookies) {
    const parts = cookie.split("=");
    const thisName = readValue(parts[0]).replace(/%3D/g, "=");
    if (thisName === name) {
      const value = parts.slice(1).join("=");
      return readValue(value);
    }
  }
};

const getPreviewCookieRepositoryName = (previewCookie) => {
  return (decodeURIComponent(previewCookie).match(/"(.+).prismic.io"/) || [])[1];
};

function PrismicPreview({
  repositoryName,
  children,
  updatePreviewURL = "/api/preview",
  exitPreviewURL = "/api/exit-preview"
}) {
  const router = useRouter();
  const resolvedUpdatePreviewURL = router.basePath + updatePreviewURL;
  const resolvedExitPreviewURL = router.basePath + exitPreviewURL;
  React.useEffect(() => {
    const startPreviewMode = async () => {
      const res = await globalThis.fetch(resolvedUpdatePreviewURL);
      if (res.ok) {
        globalThis.location.reload();
      } else {
        console.error(`[<PrismicPreview>] Failed to start or update Preview Mode using the "${resolvedUpdatePreviewURL}" API endpoint. Does it exist?`);
      }
    };
    const handlePrismicPreviewUpdate = async (event) => {
      event.preventDefault();
      await startPreviewMode();
    };
    const handlePrismicPreviewEnd = async (event) => {
      event.preventDefault();
      const res = await globalThis.fetch(resolvedExitPreviewURL);
      if (res.ok) {
        globalThis.location.reload();
      } else {
        console.error(`[<PrismicPreview>] Failed to exit Preview Mode using the "${resolvedExitPreviewURL}" API endpoint. Does it exist?`);
      }
    };
    if (router.isPreview) {
      window.addEventListener("prismicPreviewUpdate", handlePrismicPreviewUpdate);
      window.addEventListener("prismicPreviewEnd", handlePrismicPreviewEnd);
    } else {
      const prismicPreviewCookie = getCookie(prismic.cookie.preview, globalThis.document.cookie);
      if (prismicPreviewCookie) {
        const locationIsDescendantOfBasePath = window.location.href.startsWith(window.location.origin + router.basePath);
        const prismicPreviewCookieRepositoryName = getPreviewCookieRepositoryName(prismicPreviewCookie);
        if (locationIsDescendantOfBasePath && prismicPreviewCookieRepositoryName === repositoryName) {
          startPreviewMode();
        }
      }
    }
    return () => {
      window.removeEventListener("prismicPreviewUpdate", handlePrismicPreviewUpdate);
      window.removeEventListener("prismicPreviewEnd", handlePrismicPreviewEnd);
    };
  }, [
    repositoryName,
    resolvedExitPreviewURL,
    resolvedUpdatePreviewURL,
    router.isPreview,
    router.basePath
  ]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children, /* @__PURE__ */ React.createElement(PrismicToolbar, {
    repositoryName
  }));
}

const isPrismicNextPreviewData = (previewData) => {
  return typeof previewData === "object" && "ref" in previewData;
};
const enableAutoPreviews = (config) => {
  if ("previewData" in config && config.previewData) {
    const { previewData } = config;
    if (isPrismicNextPreviewData(previewData) && previewData.ref) {
      config.client.queryContentFromRef(previewData.ref);
    }
  } else if ("req" in config && config.req) {
    config.client.enableAutoPreviewsFromReq(config.req);
  }
};

const isPrismicNextQuery = (query) => {
  return typeof query.documentId === "string" && typeof query.token === "string";
};
async function redirectToPreviewURL(config) {
  const defaultURL = config.defaultURL || "/";
  const basePath = config.basePath || "";
  if (isPrismicNextQuery(config.req.query)) {
    const previewUrl = await config.client.resolvePreviewURL({
      linkResolver: config.linkResolver,
      defaultURL,
      documentID: config.req.query.documentId,
      previewToken: config.req.query.token
    });
    config.res.redirect(basePath + previewUrl);
    return;
  }
  config.res.redirect(basePath + defaultURL);
}

const camelCaseToParamCase = (input) => {
  return input.replace(/[A-Z]/g, (match) => {
    return `-${match.toLowerCase()}`;
  });
};
const buildURL = (url, params) => {
  const instance = new URL(url);
  for (const camelCasedParamKey in params) {
    const paramKey = camelCaseToParamCase(camelCasedParamKey);
    const paramValue = params[camelCasedParamKey];
    if (paramValue === void 0) {
      instance.searchParams.delete(paramKey);
    } else if (Array.isArray(paramValue)) {
      instance.searchParams.set(paramKey, paramValue.join(","));
    } else {
      instance.searchParams.set(paramKey, `${paramValue}`);
    }
  }
  const s = instance.searchParams.get("s");
  if (s) {
    instance.searchParams.delete("s");
    instance.searchParams.append("s", s);
  }
  return instance.toString();
};

const __PRODUCTION__ = (/* unused pure expression or super */ null && ("production" === "production"));

var version = "0.1.3";

const devMsg = (slug) => {
  return `https://prismic.dev/msg/next/v${version}/${slug}`;
};

const imgixLoader = (args) => {
  const url = new URL(args.src);
  const params = {
    fit: url.searchParams.get("fit") || "max",
    w: args.width,
    h: void 0
  };
  if (args.quality) {
    params.q = args.quality;
  }
  return buildURL(args.src, params);
};
const PrismicNextImage = ({
  field,
  imgixParams = {},
  alt,
  fallbackAlt,
  layout,
  ...restProps
}) => {
  if (!__PRODUCTION__) {
    if (typeof alt === "string" && alt !== "") {
      console.warn(`[PrismicNextImage] The "alt" prop can only be used to declare an image as decorative by passing an empty string (alt="") but was provided a non-empty string. You can resolve this warning by removing the "alt" prop or changing it to alt="". For more details, see ${devMsg("alt-must-be-an-empty-string")}`);
    }
    if (typeof fallbackAlt === "string" && fallbackAlt !== "") {
      console.warn(`[PrismicNextImage] The "fallbackAlt" prop can only be used to declare an image as decorative by passing an empty string (fallbackAlt="") but was provided a non-empty string. You can resolve this warning by removing the "fallbackAlt" prop or changing it to fallbackAlt="". For more details, see ${devMsg("alt-must-be-an-empty-string")}`);
    }
  }
  if (prismicH.isFilled.imageThumbnail(field)) {
    const src = buildURL(field.url, imgixParams);
    return /* @__PURE__ */ React.createElement(Image, {
      src,
      width: layout === "fill" ? void 0 : field.dimensions.width,
      height: layout === "fill" ? void 0 : field.dimensions.height,
      alt: alt != null ? alt : field.alt || fallbackAlt,
      loader: imgixLoader,
      layout,
      ...restProps
    });
  } else {
    return null;
  }
};




/***/ }),

/***/ 37502:
/***/ ((module) => {

"use strict";
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */



/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}


/***/ }),

/***/ 29004:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = initHeadManager;
exports.isEqualNode = isEqualNode;
exports.DOMAttributeNames = void 0;
function initHeadManager() {
    let updatePromise = null;
    return {
        mountedInstances: new Set(),
        updateHead: (head)=>{
            const promise = updatePromise = Promise.resolve().then(()=>{
                if (promise !== updatePromise) return;
                updatePromise = null;
                const tags = {};
                head.forEach((h)=>{
                    if (// it won't be inlined. In this case revert to the original behavior
                    h.type === "link" && h.props["data-optimized-fonts"]) {
                        if (document.querySelector(`style[data-href="${h.props["data-href"]}"]`)) {
                            return;
                        } else {
                            h.props.href = h.props["data-href"];
                            h.props["data-href"] = undefined;
                        }
                    }
                    const components = tags[h.type] || [];
                    components.push(h);
                    tags[h.type] = components;
                });
                const titleComponent = tags.title ? tags.title[0] : null;
                let title = "";
                if (titleComponent) {
                    const { children  } = titleComponent.props;
                    title = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
                }
                if (title !== document.title) document.title = title;
                [
                    "meta",
                    "base",
                    "link",
                    "style",
                    "script"
                ].forEach((type)=>{
                    updateElements(type, tags[type] || []);
                });
            });
        }
    };
}
const DOMAttributeNames = {
    acceptCharset: "accept-charset",
    className: "class",
    htmlFor: "for",
    httpEquiv: "http-equiv",
    noModule: "noModule"
};
exports.DOMAttributeNames = DOMAttributeNames;
function reactElementToDOM({ type , props  }) {
    const el = document.createElement(type);
    for(const p in props){
        if (!props.hasOwnProperty(p)) continue;
        if (p === "children" || p === "dangerouslySetInnerHTML") continue;
        // we don't render undefined props to the DOM
        if (props[p] === undefined) continue;
        const attr = DOMAttributeNames[p] || p.toLowerCase();
        if (type === "script" && (attr === "async" || attr === "defer" || attr === "noModule")) {
            el[attr] = !!props[p];
        } else {
            el.setAttribute(attr, props[p]);
        }
    }
    const { children , dangerouslySetInnerHTML  } = props;
    if (dangerouslySetInnerHTML) {
        el.innerHTML = dangerouslySetInnerHTML.__html || "";
    } else if (children) {
        el.textContent = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
    }
    return el;
}
function isEqualNode(oldTag, newTag) {
    if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
        const nonce = newTag.getAttribute("nonce");
        // Only strip the nonce if `oldTag` has had it stripped. An element's nonce attribute will not
        // be stripped if there is no content security policy response header that includes a nonce.
        if (nonce && !oldTag.getAttribute("nonce")) {
            const cloneTag = newTag.cloneNode(true);
            cloneTag.setAttribute("nonce", "");
            cloneTag.nonce = nonce;
            return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
        }
    }
    return oldTag.isEqualNode(newTag);
}
function updateElements(type, components) {
    const headEl = document.getElementsByTagName("head")[0];
    const headCountEl = headEl.querySelector("meta[name=next-head-count]");
    if (false) {}
    const headCount = Number(headCountEl.content);
    const oldTags = [];
    for(let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j === null || j === void 0 ? void 0 : j.previousElementSibling) || null){
        var ref;
        if ((j === null || j === void 0 ? void 0 : (ref = j.tagName) === null || ref === void 0 ? void 0 : ref.toLowerCase()) === type) {
            oldTags.push(j);
        }
    }
    const newTags = components.map(reactElementToDOM).filter((newTag)=>{
        for(let k = 0, len = oldTags.length; k < len; k++){
            const oldTag = oldTags[k];
            if (isEqualNode(oldTag, newTag)) {
                oldTags.splice(k, 1);
                return false;
            }
        }
        return true;
    });
    oldTags.forEach((t)=>{
        var ref;
        return (ref = t.parentNode) === null || ref === void 0 ? void 0 : ref.removeChild(t);
    });
    newTags.forEach((t)=>headEl.insertBefore(t, headCountEl)
    );
    headCountEl.content = (headCount - oldTags.length + newTags.length).toString();
}
if (typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) {
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=head-manager.js.map


/***/ }),

/***/ 96183:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = Image;
var _react = _interopRequireWildcard(__webpack_require__(60763));
var _head = _interopRequireDefault(__webpack_require__(28975));
var _imageConfig = __webpack_require__(52999);
var _useIntersection = __webpack_require__(62791);
var _imageConfigContext = __webpack_require__(74734);
var _utils = __webpack_require__(57777);
var _normalizeTrailingSlash = __webpack_require__(8051);
function Image(_param) {
    var { src , sizes , unoptimized =false , priority =false , loading , lazyRoot =null , lazyBoundary ="200px" , className , quality , width , height , style , objectFit , objectPosition , onLoadingComplete , placeholder ="empty" , blurDataURL  } = _param, all = _objectWithoutProperties(_param, [
        "src",
        "sizes",
        "unoptimized",
        "priority",
        "loading",
        "lazyRoot",
        "lazyBoundary",
        "className",
        "quality",
        "width",
        "height",
        "style",
        "objectFit",
        "objectPosition",
        "onLoadingComplete",
        "placeholder",
        "blurDataURL"
    ]);
    const configContext = (0, _react).useContext(_imageConfigContext.ImageConfigContext);
    const config = (0, _react).useMemo(()=>{
        const c = configEnv || configContext || _imageConfig.imageConfigDefault;
        const allSizes = [
            ...c.deviceSizes,
            ...c.imageSizes
        ].sort((a, b)=>a - b
        );
        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b
        );
        return _objectSpread({}, c, {
            allSizes,
            deviceSizes
        });
    }, [
        configContext
    ]);
    let rest = all;
    let layout = sizes ? "responsive" : "intrinsic";
    if ("layout" in rest) {
        // Override default layout if the user specified one:
        if (rest.layout) layout = rest.layout;
        // Remove property so it's not spread on <img>:
        delete rest.layout;
    }
    let loader = defaultImageLoader;
    if ("loader" in rest) {
        if (rest.loader) {
            const customImageLoader = rest.loader;
            var _tmp;
            _tmp = (obj)=>{
                const { config: _  } = obj, opts = _objectWithoutProperties(obj, [
                    "config"
                ]);
                // The config object is internal only so we must
                // not pass it to the user-defined loader()
                return customImageLoader(opts);
            }, loader = _tmp, _tmp;
        }
        // Remove property so it's not spread on <img>
        delete rest.loader;
    }
    let staticSrc = "";
    if (isStaticImport(src)) {
        const staticImageData = isStaticRequire(src) ? src.default : src;
        if (!staticImageData.src) {
            throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(staticImageData)}`);
        }
        blurDataURL = blurDataURL || staticImageData.blurDataURL;
        staticSrc = staticImageData.src;
        if (!layout || layout !== "fill") {
            height = height || staticImageData.height;
            width = width || staticImageData.width;
            if (!staticImageData.height || !staticImageData.width) {
                throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(staticImageData)}`);
            }
        }
    }
    src = typeof src === "string" ? src : staticSrc;
    const widthInt = getInt(width);
    const heightInt = getInt(height);
    const qualityInt = getInt(quality);
    let isLazy = !priority && (loading === "lazy" || typeof loading === "undefined");
    if (src.startsWith("data:") || src.startsWith("blob:")) {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
        unoptimized = true;
        isLazy = false;
    }
    if (false) {}
    const [blurComplete, setBlurComplete] = (0, _react).useState(false);
    const [setIntersection, isIntersected, resetIntersected] = (0, _useIntersection).useIntersection({
        rootRef: lazyRoot,
        rootMargin: lazyBoundary,
        disabled: !isLazy
    });
    const isVisible = !isLazy || isIntersected;
    const wrapperStyle = {
        boxSizing: "border-box",
        display: "block",
        overflow: "hidden",
        width: "initial",
        height: "initial",
        background: "none",
        opacity: 1,
        border: 0,
        margin: 0,
        padding: 0
    };
    const sizerStyle = {
        boxSizing: "border-box",
        display: "block",
        width: "initial",
        height: "initial",
        background: "none",
        opacity: 1,
        border: 0,
        margin: 0,
        padding: 0
    };
    let hasSizer = false;
    let sizerSvgUrl;
    const layoutStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        boxSizing: "border-box",
        padding: 0,
        border: "none",
        margin: "auto",
        display: "block",
        width: 0,
        height: 0,
        minWidth: "100%",
        maxWidth: "100%",
        minHeight: "100%",
        maxHeight: "100%",
        objectFit,
        objectPosition
    };
    if (false) {}
    if (false) {}
    const imgStyle = Object.assign({}, style, layout === "raw" ? {} : layoutStyle);
    const blurStyle = placeholder === "blur" && !blurComplete ? {
        filter: "blur(20px)",
        backgroundSize: objectFit || "cover",
        backgroundImage: `url("${blurDataURL}")`,
        backgroundPosition: objectPosition || "0% 0%"
    } : {};
    if (layout === "fill") {
        // <Image src="i.png" layout="fill" />
        wrapperStyle.display = "block";
        wrapperStyle.position = "absolute";
        wrapperStyle.top = 0;
        wrapperStyle.left = 0;
        wrapperStyle.bottom = 0;
        wrapperStyle.right = 0;
    } else if (typeof widthInt !== "undefined" && typeof heightInt !== "undefined") {
        // <Image src="i.png" width="100" height="100" />
        const quotient = heightInt / widthInt;
        const paddingTop = isNaN(quotient) ? "100%" : `${quotient * 100}%`;
        if (layout === "responsive") {
            // <Image src="i.png" width="100" height="100" layout="responsive" />
            wrapperStyle.display = "block";
            wrapperStyle.position = "relative";
            hasSizer = true;
            sizerStyle.paddingTop = paddingTop;
        } else if (layout === "intrinsic") {
            // <Image src="i.png" width="100" height="100" layout="intrinsic" />
            wrapperStyle.display = "inline-block";
            wrapperStyle.position = "relative";
            wrapperStyle.maxWidth = "100%";
            hasSizer = true;
            sizerStyle.maxWidth = "100%";
            sizerSvgUrl = `data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27${widthInt}%27%20height=%27${heightInt}%27/%3e`;
        } else if (layout === "fixed") {
            // <Image src="i.png" width="100" height="100" layout="fixed" />
            wrapperStyle.display = "inline-block";
            wrapperStyle.position = "relative";
            wrapperStyle.width = widthInt;
            wrapperStyle.height = heightInt;
        }
    } else {
        // <Image src="i.png" />
        if (false) {}
    }
    let imgAttributes = {
        src: emptyDataURL,
        srcSet: undefined,
        sizes: undefined
    };
    if (isVisible) {
        imgAttributes = generateImgAttrs({
            config,
            src,
            unoptimized,
            layout,
            width: widthInt,
            quality: qualityInt,
            sizes,
            loader
        });
    }
    let srcString = src;
    if (false) {}
    let imageSrcSetPropName = "imagesrcset";
    let imageSizesPropName = "imagesizes";
    if (true) {
        imageSrcSetPropName = "imageSrcSet";
        imageSizesPropName = "imageSizes";
    }
    const linkProps = {
        // Note: imagesrcset and imagesizes are not in the link element type with react 17.
        [imageSrcSetPropName]: imgAttributes.srcSet,
        [imageSizesPropName]: imgAttributes.sizes
    };
    const useLayoutEffect =  true ? _react.default.useEffect : 0;
    const onLoadingCompleteRef = (0, _react).useRef(onLoadingComplete);
    const previousImageSrc = (0, _react).useRef(src);
    (0, _react).useEffect(()=>{
        onLoadingCompleteRef.current = onLoadingComplete;
    }, [
        onLoadingComplete
    ]);
    useLayoutEffect(()=>{
        if (previousImageSrc.current !== src) {
            resetIntersected();
            previousImageSrc.current = src;
        }
    }, [
        resetIntersected,
        src
    ]);
    const imgElementArgs = _objectSpread({
        isLazy,
        imgAttributes,
        heightInt,
        widthInt,
        qualityInt,
        layout,
        className,
        imgStyle,
        blurStyle,
        loading,
        config,
        unoptimized,
        placeholder,
        loader,
        srcString,
        onLoadingCompleteRef,
        setBlurComplete,
        setIntersection,
        isVisible
    }, rest);
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, layout === "raw" ? /*#__PURE__*/ _react.default.createElement(ImageElement, Object.assign({}, imgElementArgs)) : /*#__PURE__*/ _react.default.createElement("span", {
        style: wrapperStyle
    }, hasSizer ? /*#__PURE__*/ _react.default.createElement("span", {
        style: sizerStyle
    }, sizerSvgUrl ? /*#__PURE__*/ _react.default.createElement("img", {
        style: {
            display: "block",
            maxWidth: "100%",
            width: "initial",
            height: "initial",
            background: "none",
            opacity: 1,
            border: 0,
            margin: 0,
            padding: 0
        },
        alt: "",
        "aria-hidden": true,
        src: sizerSvgUrl
    }) : null) : null, /*#__PURE__*/ _react.default.createElement(ImageElement, Object.assign({}, imgElementArgs))), priority ? // for browsers that do not support `imagesrcset`, and in those cases
    // it would likely cause the incorrect image to be preloaded.
    //
    // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
    /*#__PURE__*/ _react.default.createElement(_head.default, null, /*#__PURE__*/ _react.default.createElement("link", Object.assign({
        key: "__nimg-" + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes,
        rel: "preload",
        as: "image",
        href: imgAttributes.srcSet ? undefined : imgAttributes.src
    }, linkProps))) : null);
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
var ref;
const experimentalLayoutRaw = (ref = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","experimentalLayoutRaw":false}) === null || ref === void 0 ? void 0 : ref.experimentalLayoutRaw;
const configEnv = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","experimentalLayoutRaw":false};
const loadedImageURLs = new Set();
const allImgs = new Map();
let perfObserver;
const emptyDataURL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
if (true) {
    global.__NEXT_IMAGE_IMPORTED = true;
}
const VALID_LOADING_VALUES = (/* unused pure expression or super */ null && ([
    "lazy",
    "eager",
    undefined
]));
const loaders = new Map([
    [
        "default",
        defaultLoader
    ],
    [
        "imgix",
        imgixLoader
    ],
    [
        "cloudinary",
        cloudinaryLoader
    ],
    [
        "akamai",
        akamaiLoader
    ],
    [
        "custom",
        customLoader
    ], 
]);
const VALID_LAYOUT_VALUES = (/* unused pure expression or super */ null && ([
    "fill",
    "fixed",
    "intrinsic",
    "responsive",
    "raw",
    undefined, 
]));
function isStaticRequire(src) {
    return src.default !== undefined;
}
function isStaticImageData(src) {
    return src.src !== undefined;
}
function isStaticImport(src) {
    return typeof src === "object" && (isStaticRequire(src) || isStaticImageData(src));
}
function getWidths({ deviceSizes , allSizes  }, width, layout, sizes) {
    if (sizes && (layout === "fill" || layout === "responsive" || layout === "raw")) {
        // Find all the "vw" percent sizes used in the sizes prop
        const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
        const percentSizes = [];
        for(let match; match = viewportWidthRe.exec(sizes); match){
            percentSizes.push(parseInt(match[2]));
        }
        if (percentSizes.length) {
            const smallestRatio = Math.min(...percentSizes) * 0.01;
            return {
                widths: allSizes.filter((s)=>s >= deviceSizes[0] * smallestRatio
                ),
                kind: "w"
            };
        }
        return {
            widths: allSizes,
            kind: "w"
        };
    }
    if (typeof width !== "number" || layout === "fill" || layout === "responsive") {
        return {
            widths: deviceSizes,
            kind: "w"
        };
    }
    const widths = [
        ...new Set(// > are actually 3x in the green color, but only 1.5x in the red and
        // > blue colors. Showing a 3x resolution image in the app vs a 2x
        // > resolution image will be visually the same, though the 3x image
        // > takes significantly more data. Even true 3x resolution screens are
        // > wasteful as the human eye cannot see that level of detail without
        // > something like a magnifying glass.
        // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
        [
            width,
            width * 2 /*, width * 3*/ 
        ].map((w)=>allSizes.find((p)=>p >= w
            ) || allSizes[allSizes.length - 1]
        )), 
    ];
    return {
        widths,
        kind: "x"
    };
}
function generateImgAttrs({ config , src , unoptimized , layout , width , quality , sizes , loader  }) {
    if (unoptimized) {
        return {
            src,
            srcSet: undefined,
            sizes: undefined
        };
    }
    const { widths , kind  } = getWidths(config, width, layout, sizes);
    const last = widths.length - 1;
    return {
        sizes: !sizes && kind === "w" ? "100vw" : sizes,
        srcSet: widths.map((w, i)=>`${loader({
                config,
                src,
                quality,
                width: w
            })} ${kind === "w" ? w : i + 1}${kind}`
        ).join(", "),
        // It's intended to keep `src` the last attribute because React updates
        // attributes in order. If we keep `src` the first one, Safari will
        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
        // updated by React. That causes multiple unnecessary requests if `srcSet`
        // and `sizes` are defined.
        // This bug cannot be reproduced in Chrome or Firefox.
        src: loader({
            config,
            src,
            quality,
            width: widths[last]
        })
    };
}
function getInt(x) {
    if (typeof x === "number") {
        return x;
    }
    if (typeof x === "string") {
        return parseInt(x, 10);
    }
    return undefined;
}
function defaultImageLoader(loaderProps) {
    var ref2;
    const loaderKey = ((ref2 = loaderProps.config) === null || ref2 === void 0 ? void 0 : ref2.loader) || "default";
    const load = loaders.get(loaderKey);
    if (load) {
        return load(loaderProps);
    }
    throw new Error(`Unknown "loader" found in "next.config.js". Expected: ${_imageConfig.VALID_LOADERS.join(", ")}. Received: ${loaderKey}`);
}
// See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.
function handleLoading(img, src, layout, placeholder, onLoadingCompleteRef, setBlurComplete) {
    if (!img || img.src === emptyDataURL || img["data-loaded-src"] === src) {
        return;
    }
    img["data-loaded-src"] = src;
    const p = "decode" in img ? img.decode() : Promise.resolve();
    p.catch(()=>{}).then(()=>{
        if (!img.parentNode) {
            // Exit early in case of race condition:
            // - onload() is called
            // - decode() is called but incomplete
            // - unmount is called
            // - decode() completes
            return;
        }
        loadedImageURLs.add(src);
        if (placeholder === "blur") {
            setBlurComplete(true);
        }
        if (onLoadingCompleteRef === null || onLoadingCompleteRef === void 0 ? void 0 : onLoadingCompleteRef.current) {
            const { naturalWidth , naturalHeight  } = img;
            // Pass back read-only primitive values but not the
            // underlying DOM element because it could be misused.
            onLoadingCompleteRef.current({
                naturalWidth,
                naturalHeight
            });
        }
        if (false) { var ref3; }
    });
}
const ImageElement = (_param)=>{
    var { imgAttributes , heightInt , widthInt , qualityInt , layout , className , imgStyle , blurStyle , isLazy , placeholder , loading , srcString , config , unoptimized , loader , onLoadingCompleteRef , setBlurComplete , setIntersection , onLoad , onError , isVisible  } = _param, rest = _objectWithoutProperties(_param, [
        "imgAttributes",
        "heightInt",
        "widthInt",
        "qualityInt",
        "layout",
        "className",
        "imgStyle",
        "blurStyle",
        "isLazy",
        "placeholder",
        "loading",
        "srcString",
        "config",
        "unoptimized",
        "loader",
        "onLoadingCompleteRef",
        "setBlurComplete",
        "setIntersection",
        "onLoad",
        "onError",
        "isVisible"
    ]);
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement("img", Object.assign({}, rest, imgAttributes, layout === "raw" ? {
        height: heightInt,
        width: widthInt
    } : {}, {
        decoding: "async",
        "data-nimg": layout,
        className: className,
        style: _objectSpread({}, imgStyle, blurStyle),
        ref: (0, _react).useCallback((img)=>{
            setIntersection(img);
            if (img === null || img === void 0 ? void 0 : img.complete) {
                handleLoading(img, srcString, layout, placeholder, onLoadingCompleteRef, setBlurComplete);
            }
        }, [
            setIntersection,
            srcString,
            layout,
            placeholder,
            onLoadingCompleteRef,
            setBlurComplete, 
        ]),
        onLoad: (event)=>{
            const img = event.currentTarget;
            handleLoading(img, srcString, layout, placeholder, onLoadingCompleteRef, setBlurComplete);
            if (onLoad) {
                onLoad(event);
            }
        },
        onError: (event)=>{
            if (placeholder === "blur") {
                // If the real image fails to load, this will still remove the placeholder.
                setBlurComplete(true);
            }
            if (onError) {
                onError(event);
            }
        }
    })), (isLazy || placeholder === "blur") && /*#__PURE__*/ _react.default.createElement("noscript", null, /*#__PURE__*/ _react.default.createElement("img", Object.assign({}, rest, generateImgAttrs({
        config,
        src: srcString,
        unoptimized,
        layout,
        width: widthInt,
        quality: qualityInt,
        sizes: imgAttributes.sizes,
        loader
    }), layout === "raw" ? {
        height: heightInt,
        width: widthInt
    } : {}, {
        decoding: "async",
        "data-nimg": layout,
        style: imgStyle,
        className: className,
        // @ts-ignore - TODO: upgrade to `@types/react@17`
        loading: loading || "lazy"
    }))));
};
function normalizeSrc(src) {
    return src[0] === "/" ? src.slice(1) : src;
}
function imgixLoader({ config , src , width , quality  }) {
    // Demo: https://static.imgix.net/daisy.png?auto=format&fit=max&w=300
    const url = new URL(`${config.path}${normalizeSrc(src)}`);
    const params = url.searchParams;
    params.set("auto", params.get("auto") || "format");
    params.set("fit", params.get("fit") || "max");
    params.set("w", params.get("w") || width.toString());
    if (quality) {
        params.set("q", quality.toString());
    }
    return url.href;
}
function akamaiLoader({ config , src , width  }) {
    return `${config.path}${normalizeSrc(src)}?imwidth=${width}`;
}
function cloudinaryLoader({ config , src , width , quality  }) {
    // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
    const params = [
        "f_auto",
        "c_limit",
        "w_" + width,
        "q_" + (quality || "auto")
    ];
    const paramsString = params.join(",") + "/";
    return `${config.path}${paramsString}${normalizeSrc(src)}`;
}
function customLoader({ src  }) {
    throw new Error(`Image with src "${src}" is missing "loader" prop.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader`);
}
function defaultLoader({ config , src , width , quality  }) {
    if (false) {}
    if (src.endsWith(".svg") && !config.dangerouslyAllowSVG) {
        // Special case to make svg serve as-is to avoid proxying
        // through the built-in Image Optimization API.
        return src;
    }
    return `${(0, _normalizeTrailingSlash).normalizePathTrailingSlash(config.path)}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}
if (typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) {
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=image.js.map


/***/ }),

/***/ 8051:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.removePathTrailingSlash = removePathTrailingSlash;
exports.normalizePathTrailingSlash = void 0;
function removePathTrailingSlash(path) {
    return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
}
const normalizePathTrailingSlash =  false ? 0 : removePathTrailingSlash;
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;
if (typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) {
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=normalize-trailing-slash.js.map


/***/ }),

/***/ 53211:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;
const requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
    let start = Date.now();
    return setTimeout(function() {
        cb({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - start));
            }
        });
    }, 1);
};
exports.requestIdleCallback = requestIdleCallback;
const cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
    return clearTimeout(id);
};
exports.cancelIdleCallback = cancelIdleCallback;
if (typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) {
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=request-idle-callback.js.map


/***/ }),

/***/ 43171:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.getMiddlewareManifest = getMiddlewareManifest;
exports.createRouteLoader = createRouteLoader;
var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__(76830));
var _requestIdleCallback = __webpack_require__(53211);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.
const MS_MAX_IDLE_DELAY = 3800;
function withFuture(key, map, generator) {
    let entry = map.get(key);
    if (entry) {
        if ("future" in entry) {
            return entry.future;
        }
        return Promise.resolve(entry);
    }
    let resolver;
    const prom = new Promise((resolve)=>{
        resolver = resolve;
    });
    map.set(key, entry = {
        resolve: resolver,
        future: prom
    });
    return generator ? generator() // eslint-disable-next-line no-sequences
    .then((value)=>(resolver(value), value)
    ).catch((err)=>{
        map.delete(key);
        throw err;
    }) : prom;
}
function hasPrefetch(link) {
    try {
        link = document.createElement("link");
        return(// with relList.support
        (!!window.MSInputMethodContext && !!document.documentMode) || link.relList.supports("prefetch"));
    } catch (e) {
        return false;
    }
}
const canPrefetch = hasPrefetch();
function prefetchViaDom(href, as, link) {
    return new Promise((res, rej)=>{
        const selector = `
      link[rel="prefetch"][href^="${href}"],
      link[rel="preload"][href^="${href}"],
      script[src^="${href}"]`;
        if (document.querySelector(selector)) {
            return res();
        }
        link = document.createElement("link");
        // The order of property assignment here is intentional:
        if (as) link.as = as;
        link.rel = `prefetch`;
        link.crossOrigin = undefined;
        link.onload = res;
        link.onerror = rej;
        // `href` should always be last:
        link.href = href;
        document.head.appendChild(link);
    });
}
const ASSET_LOAD_ERROR = Symbol("ASSET_LOAD_ERROR");
function markAssetError(err) {
    return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}
function isAssetError(err) {
    return err && ASSET_LOAD_ERROR in err;
}
function appendScript(src, script) {
    return new Promise((resolve, reject)=>{
        script = document.createElement("script");
        // The order of property assignment here is intentional.
        // 1. Setup success/failure hooks in case the browser synchronously
        //    executes when `src` is set.
        script.onload = resolve;
        script.onerror = ()=>reject(markAssetError(new Error(`Failed to load script: ${src}`)))
        ;
        // 2. Configure the cross-origin attribute before setting `src` in case the
        //    browser begins to fetch.
        script.crossOrigin = undefined;
        // 3. Finally, set the source and inject into the DOM in case the child
        //    must be appended for fetching to start.
        script.src = src;
        document.body.appendChild(script);
    });
}
// We wait for pages to be built in dev before we start the route transition
// timeout to prevent an un-necessary hard navigation in development.
let devBuildPromise;
// Resolve a promise that times out after given amount of milliseconds.
function resolvePromiseWithTimeout(p, ms, err) {
    return new Promise((resolve, reject)=>{
        let cancelled = false;
        p.then((r)=>{
            // Resolved, cancel the timeout
            cancelled = true;
            resolve(r);
        }).catch(reject);
        // We wrap these checks separately for better dead-code elimination in
        // production bundles.
        if (false) {}
        if (true) {
            (0, _requestIdleCallback).requestIdleCallback(()=>setTimeout(()=>{
                    if (!cancelled) {
                        reject(err);
                    }
                }, ms)
            );
        }
    });
}
function getClientBuildManifest() {
    if (self.__BUILD_MANIFEST) {
        return Promise.resolve(self.__BUILD_MANIFEST);
    }
    const onBuildManifest = new Promise((resolve)=>{
        // Mandatory because this is not concurrent safe:
        const cb = self.__BUILD_MANIFEST_CB;
        self.__BUILD_MANIFEST_CB = ()=>{
            resolve(self.__BUILD_MANIFEST);
            cb && cb();
        };
    });
    return resolvePromiseWithTimeout(onBuildManifest, MS_MAX_IDLE_DELAY, markAssetError(new Error("Failed to load client build manifest")));
}
function getMiddlewareManifest() {
    if (self.__MIDDLEWARE_MANIFEST) {
        return Promise.resolve(self.__MIDDLEWARE_MANIFEST);
    }
    const onMiddlewareManifest = new Promise((resolve)=>{
        const cb = self.__MIDDLEWARE_MANIFEST_CB;
        self.__MIDDLEWARE_MANIFEST_CB = ()=>{
            resolve(self.__MIDDLEWARE_MANIFEST);
            cb && cb();
        };
    });
    return resolvePromiseWithTimeout(onMiddlewareManifest, MS_MAX_IDLE_DELAY, markAssetError(new Error("Failed to load client middleware manifest")));
}
function getFilesForRoute(assetPrefix, route) {
    if (false) {}
    return getClientBuildManifest().then((manifest)=>{
        if (!(route in manifest)) {
            throw markAssetError(new Error(`Failed to lookup route: ${route}`));
        }
        const allFiles = manifest[route].map((entry)=>assetPrefix + "/_next/" + encodeURI(entry)
        );
        return {
            scripts: allFiles.filter((v)=>v.endsWith(".js")
            ),
            css: allFiles.filter((v)=>v.endsWith(".css")
            )
        };
    });
}
function createRouteLoader(assetPrefix) {
    const entrypoints = new Map();
    const loadedScripts = new Map();
    const styleSheets = new Map();
    const routes = new Map();
    function maybeExecuteScript(src) {
        // With HMR we might need to "reload" scripts when they are
        // disposed and readded. Executing scripts twice has no functional
        // differences
        if (true) {
            let prom = loadedScripts.get(src);
            if (prom) {
                return prom;
            }
            // Skip executing script if it's already in the DOM:
            if (document.querySelector(`script[src^="${src}"]`)) {
                return Promise.resolve();
            }
            loadedScripts.set(src, prom = appendScript(src));
            return prom;
        } else {}
    }
    function fetchStyleSheet(href) {
        let prom = styleSheets.get(href);
        if (prom) {
            return prom;
        }
        styleSheets.set(href, prom = fetch(href).then((res)=>{
            if (!res.ok) {
                throw new Error(`Failed to load stylesheet: ${href}`);
            }
            return res.text().then((text)=>({
                    href: href,
                    content: text
                })
            );
        }).catch((err)=>{
            throw markAssetError(err);
        }));
        return prom;
    }
    return {
        whenEntrypoint (route) {
            return withFuture(route, entrypoints);
        },
        onEntrypoint (route, execute) {
            (execute ? Promise.resolve().then(()=>execute()
            ).then((exports)=>({
                    component: exports && exports.default || exports,
                    exports: exports
                })
            , (err)=>({
                    error: err
                })
            ) : Promise.resolve(undefined)).then((input)=>{
                const old = entrypoints.get(route);
                if (old && "resolve" in old) {
                    if (input) {
                        entrypoints.set(route, input);
                        old.resolve(input);
                    }
                } else {
                    if (input) {
                        entrypoints.set(route, input);
                    } else {
                        entrypoints.delete(route);
                    }
                    // when this entrypoint has been resolved before
                    // the route is outdated and we want to invalidate
                    // this cache entry
                    routes.delete(route);
                }
            });
        },
        loadRoute (route, prefetch) {
            return withFuture(route, routes, ()=>{
                let devBuildPromiseResolve;
                if (false) {}
                return resolvePromiseWithTimeout(getFilesForRoute(assetPrefix, route).then(({ scripts , css  })=>{
                    return Promise.all([
                        entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)),
                        Promise.all(css.map(fetchStyleSheet)), 
                    ]);
                }).then((res)=>{
                    return this.whenEntrypoint(route).then((entrypoint)=>({
                            entrypoint,
                            styles: res[1]
                        })
                    );
                }), MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`))).then(({ entrypoint , styles  })=>{
                    const res = Object.assign({
                        styles: styles
                    }, entrypoint);
                    return "error" in entrypoint ? entrypoint : res;
                }).catch((err)=>{
                    if (prefetch) {
                        // we don't want to cache errors during prefetch
                        throw err;
                    }
                    return {
                        error: err
                    };
                }).finally(()=>{
                    return devBuildPromiseResolve === null || devBuildPromiseResolve === void 0 ? void 0 : devBuildPromiseResolve();
                });
            });
        },
        prefetch (route) {
            // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
            // License: Apache 2.0
            let cn;
            if (cn = navigator.connection) {
                // Don't prefetch if using 2G or if Save-Data is enabled.
                if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
            }
            return getFilesForRoute(assetPrefix, route).then((output)=>Promise.all(canPrefetch ? output.scripts.map((script)=>prefetchViaDom(script, "script")
                ) : [])
            ).then(()=>{
                (0, _requestIdleCallback).requestIdleCallback(()=>this.loadRoute(route, true).catch(()=>{})
                );
            }).catch(()=>{});
        }
    };
}
if (typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) {
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=route-loader.js.map


/***/ }),

/***/ 97479:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "Router", ({
    enumerable: true,
    get: function() {
        return _router.default;
    }
}));
Object.defineProperty(exports, "withRouter", ({
    enumerable: true,
    get: function() {
        return _withRouter.default;
    }
}));
exports.useRouter = useRouter;
exports.createRouter = createRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(60763));
var _router = _interopRequireDefault(__webpack_require__(93119));
var _routerContext = __webpack_require__(63723);
var _isError = _interopRequireDefault(__webpack_require__(88331));
var _withRouter = _interopRequireDefault(__webpack_require__(51126));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const singletonRouter = {
    router: null,
    readyCallbacks: [],
    ready (cb) {
        if (this.router) return cb();
        if (false) {}
    }
};
// Create public properties and methods of the router in the singletonRouter
const urlPropertyFields = [
    "pathname",
    "route",
    "query",
    "asPath",
    "components",
    "isFallback",
    "basePath",
    "locale",
    "locales",
    "defaultLocale",
    "isReady",
    "isPreview",
    "isLocaleDomain",
    "domainLocales", 
];
const routerEvents = [
    "routeChangeStart",
    "beforeHistoryChange",
    "routeChangeComplete",
    "routeChangeError",
    "hashChangeStart",
    "hashChangeComplete", 
];
const coreMethodFields = [
    "push",
    "replace",
    "reload",
    "back",
    "prefetch",
    "beforePopState", 
];
// Events is a static property on the router, the router doesn't have to be initialized to use it
Object.defineProperty(singletonRouter, "events", {
    get () {
        return _router.default.events;
    }
});
urlPropertyFields.forEach((field)=>{
    // Here we need to use Object.defineProperty because we need to return
    // the property assigned to the actual router
    // The value might get changed as we change routes and this is the
    // proper way to access it
    Object.defineProperty(singletonRouter, field, {
        get () {
            const router = getRouter();
            return router[field];
        }
    });
});
coreMethodFields.forEach((field)=>{
    singletonRouter[field] = (...args)=>{
        const router = getRouter();
        return router[field](...args);
    };
});
routerEvents.forEach((event)=>{
    singletonRouter.ready(()=>{
        _router.default.events.on(event, (...args)=>{
            const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
            const _singletonRouter = singletonRouter;
            if (_singletonRouter[eventField]) {
                try {
                    _singletonRouter[eventField](...args);
                } catch (err) {
                    console.error(`Error when running the Router event: ${eventField}`);
                    console.error((0, _isError).default(err) ? `${err.message}\n${err.stack}` : err + "");
                }
            }
        });
    });
});
function getRouter() {
    if (!singletonRouter.router) {
        const message = "No router instance found.\n" + 'You should only use "next/router" on the client side of your app.\n';
        throw new Error(message);
    }
    return singletonRouter.router;
}
var _default = singletonRouter;
exports["default"] = _default;
function useRouter() {
    return _react.default.useContext(_routerContext.RouterContext);
}
function createRouter(...args) {
    singletonRouter.router = new _router.default(...args);
    singletonRouter.readyCallbacks.forEach((cb)=>cb()
    );
    singletonRouter.readyCallbacks = [];
    return singletonRouter.router;
}
function makePublicRouterInstance(router) {
    const scopedRouter = router;
    const instance = {};
    for (const property of urlPropertyFields){
        if (typeof scopedRouter[property] === "object") {
            instance[property] = Object.assign(Array.isArray(scopedRouter[property]) ? [] : {}, scopedRouter[property]) // makes sure query is not stateful
            ;
            continue;
        }
        instance[property] = scopedRouter[property];
    }
    // Events is a static property on the router, the router doesn't have to be initialized to use it
    instance.events = _router.default.events;
    coreMethodFields.forEach((field)=>{
        instance[field] = (...args)=>{
            return scopedRouter[field](...args);
        };
    });
    return instance;
}
if (typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) {
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=router.js.map


/***/ }),

/***/ 59307:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.handleClientScriptLoad = handleClientScriptLoad;
exports.initScriptLoader = initScriptLoader;
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(60763));
var _headManagerContext = __webpack_require__(16924);
var _headManager = __webpack_require__(29004);
var _requestIdleCallback = __webpack_require__(53211);
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
const ScriptCache = new Map();
const LoadCache = new Set();
const ignoreProps = [
    "onLoad",
    "dangerouslySetInnerHTML",
    "children",
    "onError",
    "strategy", 
];
const loadScript = (props)=>{
    const { src , id , onLoad =()=>{} , dangerouslySetInnerHTML , children ="" , strategy ="afterInteractive" , onError ,  } = props;
    const cacheKey = id || src;
    // Script has already loaded
    if (cacheKey && LoadCache.has(cacheKey)) {
        return;
    }
    // Contents of this script are already loading/loaded
    if (ScriptCache.has(src)) {
        LoadCache.add(cacheKey);
        // Execute onLoad since the script loading has begun
        ScriptCache.get(src).then(onLoad, onError);
        return;
    }
    const el = document.createElement("script");
    const loadPromise = new Promise((resolve, reject)=>{
        el.addEventListener("load", function(e) {
            resolve();
            if (onLoad) {
                onLoad.call(this, e);
            }
        });
        el.addEventListener("error", function(e) {
            reject(e);
        });
    }).catch(function(e) {
        if (onError) {
            onError(e);
        }
    });
    if (src) {
        ScriptCache.set(src, loadPromise);
    }
    LoadCache.add(cacheKey);
    if (dangerouslySetInnerHTML) {
        el.innerHTML = dangerouslySetInnerHTML.__html || "";
    } else if (children) {
        el.textContent = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
    } else if (src) {
        el.src = src;
    }
    for (const [k, value] of Object.entries(props)){
        if (value === undefined || ignoreProps.includes(k)) {
            continue;
        }
        const attr = _headManager.DOMAttributeNames[k] || k.toLowerCase();
        el.setAttribute(attr, value);
    }
    if (strategy === "worker") {
        el.setAttribute("type", "text/partytown");
    }
    el.setAttribute("data-nscript", strategy);
    document.body.appendChild(el);
};
function handleClientScriptLoad(props) {
    const { strategy ="afterInteractive"  } = props;
    if (strategy === "lazyOnload") {
        window.addEventListener("load", ()=>{
            (0, _requestIdleCallback).requestIdleCallback(()=>loadScript(props)
            );
        });
    } else {
        loadScript(props);
    }
}
function loadLazyScript(props) {
    if (document.readyState === "complete") {
        (0, _requestIdleCallback).requestIdleCallback(()=>loadScript(props)
        );
    } else {
        window.addEventListener("load", ()=>{
            (0, _requestIdleCallback).requestIdleCallback(()=>loadScript(props)
            );
        });
    }
}
function addBeforeInteractiveToCache() {
    const scripts = [
        ...document.querySelectorAll('[data-nscript="beforeInteractive"]'),
        ...document.querySelectorAll('[data-nscript="beforePageRender"]'), 
    ];
    scripts.forEach((script)=>{
        const cacheKey = script.id || script.getAttribute("src");
        LoadCache.add(cacheKey);
    });
}
function initScriptLoader(scriptLoaderItems) {
    scriptLoaderItems.forEach(handleClientScriptLoad);
    addBeforeInteractiveToCache();
}
function Script(props) {
    const { src ="" , onLoad =()=>{} , strategy ="afterInteractive" , onError  } = props, restProps = _objectWithoutProperties(props, [
        "src",
        "onLoad",
        "strategy",
        "onError"
    ]);
    // Context is available only during SSR
    const { updateScripts , scripts , getIsSsr  } = (0, _react).useContext(_headManagerContext.HeadManagerContext);
    (0, _react).useEffect(()=>{
        if (strategy === "afterInteractive") {
            loadScript(props);
        } else if (strategy === "lazyOnload") {
            loadLazyScript(props);
        }
    }, [
        props,
        strategy
    ]);
    if (strategy === "beforeInteractive" || strategy === "worker") {
        if (updateScripts) {
            scripts[strategy] = (scripts[strategy] || []).concat([
                _objectSpread({
                    src,
                    onLoad,
                    onError
                }, restProps), 
            ]);
            updateScripts(scripts);
        } else if (getIsSsr && getIsSsr()) {
            // Script has already loaded during SSR
            LoadCache.add(restProps.id || src);
        } else if (getIsSsr && !getIsSsr()) {
            loadScript(props);
        }
    }
    return null;
}
var _default = Script;
exports["default"] = _default;
if (typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) {
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=script.js.map


/***/ }),

/***/ 62791:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.useIntersection = useIntersection;
var _react = __webpack_require__(60763);
var _requestIdleCallback = __webpack_require__(53211);
const hasIntersectionObserver = typeof IntersectionObserver !== "undefined";
function useIntersection({ rootRef , rootMargin , disabled  }) {
    const isDisabled = disabled || !hasIntersectionObserver;
    const unobserve = (0, _react).useRef();
    const [visible, setVisible] = (0, _react).useState(false);
    const [root, setRoot] = (0, _react).useState(rootRef ? rootRef.current : null);
    const setRef = (0, _react).useCallback((el)=>{
        if (unobserve.current) {
            unobserve.current();
            unobserve.current = undefined;
        }
        if (isDisabled || visible) return;
        if (el && el.tagName) {
            unobserve.current = observe(el, (isVisible)=>isVisible && setVisible(isVisible)
            , {
                root,
                rootMargin
            });
        }
    }, [
        isDisabled,
        root,
        rootMargin,
        visible
    ]);
    const resetVisible = (0, _react).useCallback(()=>{
        setVisible(false);
    }, []);
    (0, _react).useEffect(()=>{
        if (!hasIntersectionObserver) {
            if (!visible) {
                const idleCallback = (0, _requestIdleCallback).requestIdleCallback(()=>setVisible(true)
                );
                return ()=>(0, _requestIdleCallback).cancelIdleCallback(idleCallback)
                ;
            }
        }
    }, [
        visible
    ]);
    (0, _react).useEffect(()=>{
        if (rootRef) setRoot(rootRef.current);
    }, [
        rootRef
    ]);
    return [
        setRef,
        visible,
        resetVisible
    ];
}
function observe(element, callback, options) {
    const { id , observer , elements  } = createObserver(options);
    elements.set(element, callback);
    observer.observe(element);
    return function unobserve() {
        elements.delete(element);
        observer.unobserve(element);
        // Destroy observer when there's nothing left to watch:
        if (elements.size === 0) {
            observer.disconnect();
            observers.delete(id);
            let index = idList.findIndex((obj)=>obj.root === id.root && obj.margin === id.margin
            );
            if (index > -1) {
                idList.splice(index, 1);
            }
        }
    };
}
const observers = new Map();
const idList = [];
function createObserver(options) {
    const id = {
        root: options.root || null,
        margin: options.rootMargin || ""
    };
    let existing = idList.find((obj)=>obj.root === id.root && obj.margin === id.margin
    );
    let instance;
    if (existing) {
        instance = observers.get(existing);
    } else {
        instance = observers.get(id);
        idList.push(id);
    }
    if (instance) {
        return instance;
    }
    const elements = new Map();
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            const callback = elements.get(entry.target);
            const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
            if (callback && isVisible) {
                callback(isVisible);
            }
        });
    }, options);
    observers.set(id, instance = {
        id,
        observer,
        elements
    });
    return instance;
}
if (typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) {
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-intersection.js.map


/***/ }),

/***/ 51126:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = withRouter;
var _react = _interopRequireDefault(__webpack_require__(60763));
var _router = __webpack_require__(97479);
function withRouter(ComposedComponent) {
    function WithRouterWrapper(props) {
        return /*#__PURE__*/ _react.default.createElement(ComposedComponent, Object.assign({
            router: (0, _router).useRouter()
        }, props));
    }
    WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps;
    WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;
    if (false) {}
    return WithRouterWrapper;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
if (typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) {
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=with-router.js.map


/***/ }),

/***/ 97532:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.AmpStateContext = void 0;
var _react = _interopRequireDefault(__webpack_require__(60763));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const AmpStateContext = _react.default.createContext({});
exports.AmpStateContext = AmpStateContext;
if (false) {} //# sourceMappingURL=amp-context.js.map


/***/ }),

/***/ 52895:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.isInAmpMode = isInAmpMode;
exports.useAmp = useAmp;
var _react = _interopRequireDefault(__webpack_require__(60763));
var _ampContext = __webpack_require__(97532);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function isInAmpMode({ ampFirst =false , hybrid =false , hasQuery =false ,  } = {}) {
    return ampFirst || hybrid && hasQuery;
}
function useAmp() {
    // Don't assign the context value to a variable to save bytes
    return isInAmpMode(_react.default.useContext(_ampContext.AmpStateContext));
}
if (typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) {
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=amp.js.map


/***/ }),

/***/ 16924:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.HeadManagerContext = void 0;
var _react = _interopRequireDefault(__webpack_require__(60763));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const HeadManagerContext = _react.default.createContext({});
exports.HeadManagerContext = HeadManagerContext;
if (false) {} //# sourceMappingURL=head-manager-context.js.map


/***/ }),

/***/ 28975:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.defaultHead = defaultHead;
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(60763));
var _sideEffect = _interopRequireDefault(__webpack_require__(32959));
var _ampContext = __webpack_require__(97532);
var _headManagerContext = __webpack_require__(16924);
var _amp = __webpack_require__(52895);
var _utils = __webpack_require__(57777);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
function defaultHead(inAmpMode = false) {
    const head = [
        /*#__PURE__*/ _react.default.createElement("meta", {
            charSet: "utf-8"
        })
    ];
    if (!inAmpMode) {
        head.push(/*#__PURE__*/ _react.default.createElement("meta", {
            name: "viewport",
            content: "width=device-width"
        }));
    }
    return head;
}
function onlyReactElement(list, child) {
    // React children can be "string" or "number" in this case we ignore them for backwards compat
    if (typeof child === "string" || typeof child === "number") {
        return list;
    }
    // Adds support for React.Fragment
    if (child.type === _react.default.Fragment) {
        return list.concat(_react.default.Children.toArray(child.props.children).reduce((fragmentList, fragmentChild)=>{
            if (typeof fragmentChild === "string" || typeof fragmentChild === "number") {
                return fragmentList;
            }
            return fragmentList.concat(fragmentChild);
        }, []));
    }
    return list.concat(child);
}
const METATYPES = [
    "name",
    "httpEquiv",
    "charSet",
    "itemProp"
];
/*
 returns a function for filtering head child elements
 which shouldn't be duplicated, like <title/>
 Also adds support for deduplicated `key` properties
*/ function unique() {
    const keys = new Set();
    const tags = new Set();
    const metaTypes = new Set();
    const metaCategories = {};
    return (h)=>{
        let isUnique = true;
        let hasKey = false;
        if (h.key && typeof h.key !== "number" && h.key.indexOf("$") > 0) {
            hasKey = true;
            const key = h.key.slice(h.key.indexOf("$") + 1);
            if (keys.has(key)) {
                isUnique = false;
            } else {
                keys.add(key);
            }
        }
        // eslint-disable-next-line default-case
        switch(h.type){
            case "title":
            case "base":
                if (tags.has(h.type)) {
                    isUnique = false;
                } else {
                    tags.add(h.type);
                }
                break;
            case "meta":
                for(let i = 0, len = METATYPES.length; i < len; i++){
                    const metatype = METATYPES[i];
                    if (!h.props.hasOwnProperty(metatype)) continue;
                    if (metatype === "charSet") {
                        if (metaTypes.has(metatype)) {
                            isUnique = false;
                        } else {
                            metaTypes.add(metatype);
                        }
                    } else {
                        const category = h.props[metatype];
                        const categories = metaCategories[metatype] || new Set();
                        if ((metatype !== "name" || !hasKey) && categories.has(category)) {
                            isUnique = false;
                        } else {
                            categories.add(category);
                            metaCategories[metatype] = categories;
                        }
                    }
                }
                break;
        }
        return isUnique;
    };
}
/**
 *
 * @param headElements List of multiple <Head> instances
 */ function reduceComponents(headElements, props) {
    return headElements.reduce((list, headElement)=>{
        const headElementChildren = _react.default.Children.toArray(headElement.props.children);
        return list.concat(headElementChildren);
    }, []).reduce(onlyReactElement, []).reverse().concat(defaultHead(props.inAmpMode)).filter(unique()).reverse().map((c, i)=>{
        const key = c.key || i;
        if ( true && !props.inAmpMode) {
            if (c.type === "link" && c.props["href"] && [
                "https://fonts.googleapis.com/css",
                "https://use.typekit.net/"
            ].some((url)=>c.props["href"].startsWith(url)
            )) {
                const newProps = {
                    ...c.props || {}
                };
                newProps["data-href"] = newProps["href"];
                newProps["href"] = undefined;
                // Add this attribute to make it easy to identify optimized tags
                newProps["data-optimized-fonts"] = true;
                return /*#__PURE__*/ _react.default.cloneElement(c, newProps);
            }
        }
        if (false) {}
        return /*#__PURE__*/ _react.default.cloneElement(c, {
            key
        });
    });
}
/**
 * This component injects elements to `<head>` of your page.
 * To avoid duplicated `tags` in `<head>` you can use the `key` property, which will make sure every tag is only rendered once.
 */ function Head({ children  }) {
    const ampState = (0, _react).useContext(_ampContext.AmpStateContext);
    const headManager = (0, _react).useContext(_headManagerContext.HeadManagerContext);
    return /*#__PURE__*/ _react.default.createElement(_sideEffect.default, {
        reduceComponentsToState: reduceComponents,
        headManager: headManager,
        inAmpMode: (0, _amp).isInAmpMode(ampState)
    }, children);
}
var _default = Head;
exports["default"] = _default;
if (typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) {
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=head.js.map


/***/ }),

/***/ 74734:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ImageConfigContext = void 0;
var _react = _interopRequireDefault(__webpack_require__(60763));
var _imageConfig = __webpack_require__(52999);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const ImageConfigContext = _react.default.createContext(_imageConfig.imageConfigDefault);
exports.ImageConfigContext = ImageConfigContext;
if (false) {} //# sourceMappingURL=image-config-context.js.map


/***/ }),

/***/ 52999:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.imageConfigDefault = exports.VALID_LOADERS = void 0;
const VALID_LOADERS = [
    "default",
    "imgix",
    "cloudinary",
    "akamai",
    "custom", 
];
exports.VALID_LOADERS = VALID_LOADERS;
const imageConfigDefault = {
    deviceSizes: [
        640,
        750,
        828,
        1080,
        1200,
        1920,
        2048,
        3840
    ],
    imageSizes: [
        16,
        32,
        48,
        64,
        96,
        128,
        256,
        384
    ],
    path: "/_next/image",
    loader: "default",
    domains: [],
    disableStaticImages: false,
    minimumCacheTTL: 60,
    formats: [
        "image/webp"
    ],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: `script-src 'none'; frame-src 'none'; sandbox;`
};
exports.imageConfigDefault = imageConfigDefault; //# sourceMappingURL=image-config.js.map


/***/ }),

/***/ 50702:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = mitt;
function mitt() {
    const all = Object.create(null);
    return {
        on (type, handler) {
            (all[type] || (all[type] = [])).push(handler);
        },
        off (type, handler) {
            if (all[type]) {
                all[type].splice(all[type].indexOf(handler) >>> 0, 1);
            }
        },
        emit (type, ...evts) {
            (all[type] || []).slice().map((handler)=>{
                handler(...evts);
            });
        }
    };
} //# sourceMappingURL=mitt.js.map


/***/ }),

/***/ 63723:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.RouterContext = void 0;
var _react = _interopRequireDefault(__webpack_require__(60763));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const RouterContext = _react.default.createContext(null);
exports.RouterContext = RouterContext;
if (false) {} //# sourceMappingURL=router-context.js.map


/***/ }),

/***/ 93119:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getDomainLocale = getDomainLocale;
exports.addLocale = addLocale;
exports.delLocale = delLocale;
exports.hasBasePath = hasBasePath;
exports.addBasePath = addBasePath;
exports.delBasePath = delBasePath;
exports.isLocalURL = isLocalURL;
exports.interpolateAs = interpolateAs;
exports.resolveHref = resolveHref;
exports["default"] = void 0;
var _normalizeTrailingSlash = __webpack_require__(8051);
var _routeLoader = __webpack_require__(43171);
var _script = __webpack_require__(59307);
var _isError = _interopRequireWildcard(__webpack_require__(88331));
var _denormalizePagePath = __webpack_require__(55734);
var _normalizeLocalePath = __webpack_require__(20852);
var _mitt = _interopRequireDefault(__webpack_require__(50702));
var _utils = __webpack_require__(57777);
var _isDynamic = __webpack_require__(41562);
var _parseRelativeUrl = __webpack_require__(33505);
var _querystring = __webpack_require__(40042);
var _resolveRewrites = _interopRequireDefault(__webpack_require__(50016));
var _routeMatcher = __webpack_require__(67715);
var _routeRegex = __webpack_require__(16386);
var _getMiddlewareRegex = __webpack_require__(7963);
var _formatUrl = __webpack_require__(96840);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
let detectDomainLocale;
if (false) {}
const basePath =  false || "";
function buildCancellationError() {
    return Object.assign(new Error("Route Cancelled"), {
        cancelled: true
    });
}
function addPathPrefix(path, prefix) {
    if (!path.startsWith("/") || !prefix) {
        return path;
    }
    const pathname = pathNoQueryHash(path);
    return (0, _normalizeTrailingSlash).normalizePathTrailingSlash(`${prefix}${pathname}`) + path.slice(pathname.length);
}
function hasPathPrefix(path, prefix) {
    path = pathNoQueryHash(path);
    return path === prefix || path.startsWith(prefix + "/");
}
function getDomainLocale(path, locale, locales, domainLocales) {
    if (false) {} else {
        return false;
    }
}
function addLocale(path, locale, defaultLocale) {
    if (false) {}
    return path;
}
function delLocale(path, locale) {
    if (false) {}
    return path;
}
function pathNoQueryHash(path) {
    const queryIndex = path.indexOf("?");
    const hashIndex = path.indexOf("#");
    if (queryIndex > -1 || hashIndex > -1) {
        path = path.substring(0, queryIndex > -1 ? queryIndex : hashIndex);
    }
    return path;
}
function hasBasePath(path) {
    return hasPathPrefix(path, basePath);
}
function addBasePath(path) {
    // we only add the basepath on relative urls
    return addPathPrefix(path, basePath);
}
function delBasePath(path) {
    path = path.slice(basePath.length);
    if (!path.startsWith("/")) path = `/${path}`;
    return path;
}
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (url.startsWith("/") || url.startsWith("#") || url.startsWith("?")) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils).getLocationOrigin();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
    } catch (_) {
        return false;
    }
}
function interpolateAs(route, asPathname, query) {
    let interpolatedRoute = "";
    const dynamicRegex = (0, _routeRegex).getRouteRegex(route);
    const dynamicGroups = dynamicRegex.groups;
    const dynamicMatches = (asPathname !== route ? (0, _routeMatcher).getRouteMatcher(dynamicRegex)(asPathname) : "") || // TODO: should this take priority; also need to change in the router.
    query;
    interpolatedRoute = route;
    const params = Object.keys(dynamicGroups);
    if (!params.every((param)=>{
        let value = dynamicMatches[param] || "";
        const { repeat , optional  } = dynamicGroups[param];
        // support single-level catch-all
        // TODO: more robust handling for user-error (passing `/`)
        let replaced = `[${repeat ? "..." : ""}${param}]`;
        if (optional) {
            replaced = `${!value ? "/" : ""}[${replaced}]`;
        }
        if (repeat && !Array.isArray(value)) value = [
            value
        ];
        return (optional || param in dynamicMatches) && (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map(// path delimiter escaped since they are being inserted
        // into the URL and we expect URL encoded segments
        // when parsing dynamic route params
        (segment)=>encodeURIComponent(segment)
        ).join("/") : encodeURIComponent(value)) || "/");
    })) {
        interpolatedRoute = "" // did not satisfy all requirements
        ;
    // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
    }
    return {
        params,
        result: interpolatedRoute
    };
}
function omitParmsFromQuery(query, params) {
    const filteredQuery = {};
    Object.keys(query).forEach((key)=>{
        if (!params.includes(key)) {
            filteredQuery[key] = query[key];
        }
    });
    return filteredQuery;
}
function resolveHref(router, href, resolveAs) {
    // we use a dummy base url for relative urls
    let base;
    let urlAsString = typeof href === "string" ? href : (0, _formatUrl).formatWithValidation(href);
    // repeated slashes and backslashes in the URL are considered
    // invalid and will never match a Next.js page/file
    const urlProtoMatch = urlAsString.match(/^[a-zA-Z]{1,}:\/\//);
    const urlAsStringNoProto = urlProtoMatch ? urlAsString.slice(urlProtoMatch[0].length) : urlAsString;
    const urlParts = urlAsStringNoProto.split("?");
    if ((urlParts[0] || "").match(/(\/\/|\\)/)) {
        console.error(`Invalid href passed to next/router: ${urlAsString}, repeated forward-slashes (//) or backslashes \\ are not valid in the href`);
        const normalizedUrl = (0, _utils).normalizeRepeatedSlashes(urlAsStringNoProto);
        urlAsString = (urlProtoMatch ? urlProtoMatch[0] : "") + normalizedUrl;
    }
    // Return because it cannot be routed by the Next.js router
    if (!isLocalURL(urlAsString)) {
        return resolveAs ? [
            urlAsString
        ] : urlAsString;
    }
    try {
        base = new URL(urlAsString.startsWith("#") ? router.asPath : router.pathname, "http://n");
    } catch (_) {
        // fallback to / for invalid asPath values e.g. //
        base = new URL("/", "http://n");
    }
    try {
        const finalUrl = new URL(urlAsString, base);
        finalUrl.pathname = (0, _normalizeTrailingSlash).normalizePathTrailingSlash(finalUrl.pathname);
        let interpolatedAs = "";
        if ((0, _isDynamic).isDynamicRoute(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
            const query = (0, _querystring).searchParamsToUrlQuery(finalUrl.searchParams);
            const { result , params  } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);
            if (result) {
                interpolatedAs = (0, _formatUrl).formatWithValidation({
                    pathname: result,
                    hash: finalUrl.hash,
                    query: omitParmsFromQuery(query, params)
                });
            }
        }
        // if the origin didn't change, it means we received a relative href
        const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
        return resolveAs ? [
            resolvedHref,
            interpolatedAs || resolvedHref
        ] : resolvedHref;
    } catch (_1) {
        return resolveAs ? [
            urlAsString
        ] : urlAsString;
    }
}
function stripOrigin(url) {
    const origin = (0, _utils).getLocationOrigin();
    return url.startsWith(origin) ? url.substring(origin.length) : url;
}
function prepareUrlAs(router, url, as) {
    // If url and as provided as an object representation,
    // we'll format them into the string version here.
    let [resolvedHref, resolvedAs] = resolveHref(router, url, true);
    const origin = (0, _utils).getLocationOrigin();
    const hrefHadOrigin = resolvedHref.startsWith(origin);
    const asHadOrigin = resolvedAs && resolvedAs.startsWith(origin);
    resolvedHref = stripOrigin(resolvedHref);
    resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
    const preparedUrl = hrefHadOrigin ? resolvedHref : addBasePath(resolvedHref);
    const preparedAs = as ? stripOrigin(resolveHref(router, as)) : resolvedAs || resolvedHref;
    return {
        url: preparedUrl,
        as: asHadOrigin ? preparedAs : addBasePath(preparedAs)
    };
}
function resolveDynamicRoute(pathname, pages) {
    const cleanPathname = (0, _normalizeTrailingSlash).removePathTrailingSlash((0, _denormalizePagePath).denormalizePagePath(pathname));
    if (cleanPathname === "/404" || cleanPathname === "/_error") {
        return pathname;
    }
    // handle resolving href for dynamic routes
    if (!pages.includes(cleanPathname)) {
        // eslint-disable-next-line array-callback-return
        pages.some((page)=>{
            if ((0, _isDynamic).isDynamicRoute(page) && (0, _routeRegex).getRouteRegex(page).re.test(cleanPathname)) {
                pathname = page;
                return true;
            }
        });
    }
    return (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname);
}
const manualScrollRestoration = (/* unused pure expression or super */ null && ( false && 0));
const SSG_DATA_NOT_FOUND = Symbol("SSG_DATA_NOT_FOUND");
function fetchRetry(url, attempts, opts) {
    return fetch(url, {
        // Cookies are required to be present for Next.js' SSG "Preview Mode".
        // Cookies may also be required for `getServerSideProps`.
        //
        // > `fetch` won’t send cookies, unless you set the credentials init
        // > option.
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        //
        // > For maximum browser compatibility when it comes to sending &
        // > receiving cookies, always supply the `credentials: 'same-origin'`
        // > option instead of relying on the default.
        // https://github.com/github/fetch#caveats
        credentials: "same-origin"
    }).then((res)=>{
        if (!res.ok) {
            if (attempts > 1 && res.status >= 500) {
                return fetchRetry(url, attempts - 1, opts);
            }
            if (res.status === 404) {
                return res.json().then((data)=>{
                    if (data.notFound) {
                        return {
                            notFound: SSG_DATA_NOT_FOUND
                        };
                    }
                    throw new Error(`Failed to load static props`);
                });
            }
            throw new Error(`Failed to load static props`);
        }
        return opts.text ? res.text() : res.json();
    });
}
function fetchNextData(dataHref, isServerRender, text, inflightCache, persistCache) {
    const { href: cacheKey  } = new URL(dataHref, window.location.href);
    if (inflightCache[cacheKey] !== undefined) {
        return inflightCache[cacheKey];
    }
    return inflightCache[cacheKey] = fetchRetry(dataHref, isServerRender ? 3 : 1, {
        text
    }).catch((err)=>{
        // We should only trigger a server-side transition if this was caused
        // on a client-side transition. Otherwise, we'd get into an infinite
        // loop.
        if (!isServerRender) {
            (0, _routeLoader).markAssetError(err);
        }
        throw err;
    }).then((data)=>{
        if (!persistCache || "production" !== "production") {
            delete inflightCache[cacheKey];
        }
        return data;
    }).catch((err)=>{
        delete inflightCache[cacheKey];
        throw err;
    });
}
class Router {
    constructor(pathname1, query1, as1, { initialProps , pageLoader , App , wrapApp , Component , err , subscription , isFallback , locale , locales , defaultLocale , domainLocales , isPreview , isRsc  }){
        // Static Data Cache
        this.sdc = {};
        // In-flight Server Data Requests, for deduping
        this.sdr = {};
        // In-flight middleware preflight requests
        this.sde = {};
        this._idx = 0;
        this.onPopState = (e)=>{
            const state = e.state;
            if (!state) {
                // We get state as undefined for two reasons.
                //  1. With older safari (< 8) and older chrome (< 34)
                //  2. When the URL changed with #
                //
                // In the both cases, we don't need to proceed and change the route.
                // (as it's already changed)
                // But we can simply replace the state with the new changes.
                // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
                // So, doing the following for (1) does no harm.
                const { pathname , query  } = this;
                this.changeState("replaceState", (0, _formatUrl).formatWithValidation({
                    pathname: addBasePath(pathname),
                    query
                }), (0, _utils).getURL());
                return;
            }
            if (!state.__N) {
                return;
            }
            let forcedScroll;
            const { url , as , options , idx  } = state;
            if (false) {}
            this._idx = idx;
            const { pathname  } = (0, _parseRelativeUrl).parseRelativeUrl(url);
            // Make sure we don't re-render on initial load,
            // can be caused by navigating back from an external site
            if (this.isSsr && as === addBasePath(this.asPath) && pathname === addBasePath(this.pathname)) {
                return;
            }
            // If the downstream application returns falsy, return.
            // They will then be responsible for handling the event.
            if (this._bps && !this._bps(state)) {
                return;
            }
            this.change("replaceState", url, as, Object.assign({}, options, {
                shallow: options.shallow && this._shallow,
                locale: options.locale || this.defaultLocale
            }), forcedScroll);
        };
        // represents the current component key
        const route = (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname1);
        // set up the component cache (by route keys)
        this.components = {};
        // We should not keep the cache, if there's an error
        // Otherwise, this cause issues when when going back and
        // come again to the errored page.
        if (pathname1 !== "/_error") {
            this.components[route] = {
                Component,
                initial: true,
                props: initialProps,
                err,
                __N_SSG: initialProps && initialProps.__N_SSG,
                __N_SSP: initialProps && initialProps.__N_SSP,
                __N_RSC: !!isRsc
            };
        }
        this.components["/_app"] = {
            Component: App,
            styleSheets: []
        };
        // Backwards compat for Router.router.events
        // TODO: Should be remove the following major version as it was never documented
        this.events = Router.events;
        this.pageLoader = pageLoader;
        // if auto prerendered and dynamic route wait to update asPath
        // until after mount to prevent hydration mismatch
        const autoExportDynamic = (0, _isDynamic).isDynamicRoute(pathname1) && self.__NEXT_DATA__.autoExport;
        this.basePath = basePath;
        this.sub = subscription;
        this.clc = null;
        this._wrapApp = wrapApp;
        // make sure to ignore extra popState in safari on navigating
        // back from external site
        this.isSsr = true;
        this.isLocaleDomain = false;
        this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || self.__NEXT_DATA__.appGip && !self.__NEXT_DATA__.gsp || !autoExportDynamic && !self.location.search && !false);
        if (false) {}
        this.state = {
            route,
            pathname: pathname1,
            query: query1,
            asPath: autoExportDynamic ? pathname1 : as1,
            isPreview: !!isPreview,
            locale:  false ? 0 : undefined,
            isFallback
        };
        if (false) {}
    }
    reload() {
        window.location.reload();
    }
    /**
   * Go back in history
   */ back() {
        window.history.back();
    }
    /**
   * Performs a `pushState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */ push(url, as, options = {}) {
        if (false) {}
        ({ url , as  } = prepareUrlAs(this, url, as));
        return this.change("pushState", url, as, options);
    }
    /**
   * Performs a `replaceState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */ replace(url, as, options = {}) {
        ({ url , as  } = prepareUrlAs(this, url, as));
        return this.change("replaceState", url, as, options);
    }
    async change(method, url, as, options, forcedScroll) {
        if (!isLocalURL(url)) {
            window.location.href = url;
            return false;
        }
        const shouldResolveHref = options._h || options._shouldResolveHref || pathNoQueryHash(url) === pathNoQueryHash(as);
        const nextState = {
            ...this.state
        };
        // for static pages with query params in the URL we delay
        // marking the router ready until after the query is updated
        if (options._h) {
            this.isReady = true;
        }
        const prevLocale = nextState.locale;
        if (false) { var ref; }
        if (!options._h) {
            this.isSsr = false;
        }
        // marking route changes as a navigation start entry
        if (_utils.ST) {
            performance.mark("routeChange");
        }
        const { shallow =false , scroll =true  } = options;
        const routeProps = {
            shallow
        };
        if (this._inFlightRoute) {
            this.abortComponentLoad(this._inFlightRoute, routeProps);
        }
        as = addBasePath(addLocale(hasBasePath(as) ? delBasePath(as) : as, options.locale, this.defaultLocale));
        const cleanedAs = delLocale(hasBasePath(as) ? delBasePath(as) : as, nextState.locale);
        this._inFlightRoute = as;
        let localeChange = prevLocale !== nextState.locale;
        // If the url change is only related to a hash change
        // We should not proceed. We should only change the state.
        // WARNING: `_h` is an internal option for handing Next.js client-side
        // hydration. Your app should _never_ use this property. It may change at
        // any time without notice.
        if (!options._h && this.onlyAHashChange(cleanedAs) && !localeChange) {
            nextState.asPath = cleanedAs;
            Router.events.emit("hashChangeStart", as, routeProps);
            // TODO: do we need the resolved href when only a hash change?
            this.changeState(method, url, as, {
                ...options,
                scroll: false
            });
            if (scroll) {
                this.scrollToHash(cleanedAs);
            }
            this.set(nextState, this.components[nextState.route], null);
            Router.events.emit("hashChangeComplete", as, routeProps);
            return true;
        }
        let parsed = (0, _parseRelativeUrl).parseRelativeUrl(url);
        let { pathname , query  } = parsed;
        // The build manifest needs to be loaded before auto-static dynamic pages
        // get their query parameters to allow ensuring they can be parsed properly
        // when rewritten to
        let pages, rewrites;
        try {
            [pages, { __rewrites: rewrites  }] = await Promise.all([
                this.pageLoader.getPageList(),
                (0, _routeLoader).getClientBuildManifest(),
                this.pageLoader.getMiddlewareList(), 
            ]);
        } catch (err) {
            // If we fail to resolve the page list or client-build manifest, we must
            // do a server-side transition:
            window.location.href = as;
            return false;
        }
        // If asked to change the current URL we should reload the current page
        // (not location.reload() but reload getInitialProps and other Next.js stuffs)
        // We also need to set the method = replaceState always
        // as this should not go into the history (That's how browsers work)
        // We should compare the new asPath to the current asPath, not the url
        if (!this.urlIsNew(cleanedAs) && !localeChange) {
            method = "replaceState";
        }
        // we need to resolve the as value using rewrites for dynamic SSG
        // pages to allow building the data URL correctly
        let resolvedAs = as;
        // url and as should always be prefixed with basePath by this
        // point by either next/link or router.push/replace so strip the
        // basePath from the pathname to match the pages dir 1-to-1
        pathname = pathname ? (0, _normalizeTrailingSlash).removePathTrailingSlash(delBasePath(pathname)) : pathname;
        if (shouldResolveHref && pathname !== "/_error") {
            options._shouldResolveHref = true;
            if (false) {} else {
                parsed.pathname = resolveDynamicRoute(pathname, pages);
                if (parsed.pathname !== pathname) {
                    pathname = parsed.pathname;
                    parsed.pathname = addBasePath(pathname);
                    url = (0, _formatUrl).formatWithValidation(parsed);
                }
            }
        }
        if (!isLocalURL(as)) {
            if (false) {}
            window.location.href = as;
            return false;
        }
        resolvedAs = delLocale(delBasePath(resolvedAs), nextState.locale);
        /**
     * If the route update was triggered for client-side hydration and
     * the rendered route is not dynamic do not check the preflight
     * request as it is not necessary.
     */ if ((!options.shallow || options._h === 1) && (options._h !== 1 || (0, _isDynamic).isDynamicRoute((0, _normalizeTrailingSlash).removePathTrailingSlash(pathname)))) {
            const effect = await this._preflightRequest({
                as,
                cache: "production" === "production",
                pages,
                pathname,
                query,
                locale: nextState.locale,
                isPreview: nextState.isPreview
            });
            if (effect.type === "rewrite") {
                query = {
                    ...query,
                    ...effect.parsedAs.query
                };
                resolvedAs = effect.asPath;
                pathname = effect.resolvedHref;
                parsed.pathname = effect.resolvedHref;
                url = (0, _formatUrl).formatWithValidation(parsed);
            } else if (effect.type === "redirect" && effect.newAs) {
                return this.change(method, effect.newUrl, effect.newAs, options);
            } else if (effect.type === "redirect" && effect.destination) {
                window.location.href = effect.destination;
                return new Promise(()=>{});
            } else if (effect.type === "refresh" && as !== window.location.pathname) {
                window.location.href = as;
                return new Promise(()=>{});
            }
        }
        const route = (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname);
        if ((0, _isDynamic).isDynamicRoute(route)) {
            const parsedAs = (0, _parseRelativeUrl).parseRelativeUrl(resolvedAs);
            const asPathname = parsedAs.pathname;
            const routeRegex = (0, _routeRegex).getRouteRegex(route);
            const routeMatch = (0, _routeMatcher).getRouteMatcher(routeRegex)(asPathname);
            const shouldInterpolate = route === asPathname;
            const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query) : {};
            if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
                const missingParams = Object.keys(routeRegex.groups).filter((param)=>!query[param]
                );
                if (missingParams.length > 0) {
                    if (false) {}
                    throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(", ")}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://nextjs.org/docs/messages/${shouldInterpolate ? "href-interpolation-failed" : "incompatible-href-as"}`);
                }
            } else if (shouldInterpolate) {
                as = (0, _formatUrl).formatWithValidation(Object.assign({}, parsedAs, {
                    pathname: interpolatedAs.result,
                    query: omitParmsFromQuery(query, interpolatedAs.params)
                }));
            } else {
                // Merge params into `query`, overwriting any specified in search
                Object.assign(query, routeMatch);
            }
        }
        Router.events.emit("routeChangeStart", as, routeProps);
        try {
            var ref1, ref2;
            let routeInfo = await this.getRouteInfo(route, pathname, query, as, resolvedAs, routeProps, nextState.locale, nextState.isPreview);
            let { error , props , __N_SSG , __N_SSP  } = routeInfo;
            const component = routeInfo.Component;
            if (component && component.unstable_scriptLoader) {
                const scripts = [].concat(component.unstable_scriptLoader());
                scripts.forEach((script)=>{
                    (0, _script).handleClientScriptLoad(script.props);
                });
            }
            // handle redirect on client-transition
            if ((__N_SSG || __N_SSP) && props) {
                if (props.pageProps && props.pageProps.__N_REDIRECT) {
                    const destination = props.pageProps.__N_REDIRECT;
                    // check if destination is internal (resolves to a page) and attempt
                    // client-navigation if it is falling back to hard navigation if
                    // it's not
                    if (destination.startsWith("/") && props.pageProps.__N_REDIRECT_BASE_PATH !== false) {
                        const parsedHref = (0, _parseRelativeUrl).parseRelativeUrl(destination);
                        parsedHref.pathname = resolveDynamicRoute(parsedHref.pathname, pages);
                        const { url: newUrl , as: newAs  } = prepareUrlAs(this, destination, destination);
                        return this.change(method, newUrl, newAs, options);
                    }
                    window.location.href = destination;
                    return new Promise(()=>{});
                }
                nextState.isPreview = !!props.__N_PREVIEW;
                // handle SSG data 404
                if (props.notFound === SSG_DATA_NOT_FOUND) {
                    let notFoundRoute;
                    try {
                        await this.fetchComponent("/404");
                        notFoundRoute = "/404";
                    } catch (_) {
                        notFoundRoute = "/_error";
                    }
                    routeInfo = await this.getRouteInfo(notFoundRoute, notFoundRoute, query, as, resolvedAs, {
                        shallow: false
                    }, nextState.locale, nextState.isPreview);
                }
            }
            Router.events.emit("beforeHistoryChange", as, routeProps);
            this.changeState(method, url, as, options);
            if (options._h && pathname === "/_error" && ((ref1 = self.__NEXT_DATA__.props) === null || ref1 === void 0 ? void 0 : (ref2 = ref1.pageProps) === null || ref2 === void 0 ? void 0 : ref2.statusCode) === 500 && (props === null || props === void 0 ? void 0 : props.pageProps)) {
                // ensure statusCode is still correct for static 500 page
                // when updating query information
                props.pageProps.statusCode = 500;
            }
            // shallow routing is only allowed for same page URL changes.
            const isValidShallowRoute = options.shallow && nextState.route === route;
            var _scroll;
            const shouldScroll = (_scroll = options.scroll) !== null && _scroll !== void 0 ? _scroll : !isValidShallowRoute;
            const resetScroll = shouldScroll ? {
                x: 0,
                y: 0
            } : null;
            await this.set({
                ...nextState,
                route,
                pathname,
                query,
                asPath: cleanedAs,
                isFallback: false
            }, routeInfo, forcedScroll !== null && forcedScroll !== void 0 ? forcedScroll : resetScroll).catch((e)=>{
                if (e.cancelled) error = error || e;
                else throw e;
            });
            if (error) {
                Router.events.emit("routeChangeError", error, cleanedAs, routeProps);
                throw error;
            }
            if (false) {}
            Router.events.emit("routeChangeComplete", as, routeProps);
            return true;
        } catch (err1) {
            if ((0, _isError).default(err1) && err1.cancelled) {
                return false;
            }
            throw err1;
        }
    }
    changeState(method, url, as, options = {}) {
        if (false) {}
        if (method !== "pushState" || (0, _utils).getURL() !== as) {
            this._shallow = options.shallow;
            window.history[method]({
                url,
                as,
                options,
                __N: true,
                idx: this._idx = method !== "pushState" ? this._idx : this._idx + 1
            }, // Passing the empty string here should be safe against future changes to the method.
            // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
            "", as);
        }
    }
    async handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
        if (err.cancelled) {
            // bubble up cancellation errors
            throw err;
        }
        if ((0, _routeLoader).isAssetError(err) || loadErrorFail) {
            Router.events.emit("routeChangeError", err, as, routeProps);
            // If we can't load the page it could be one of following reasons
            //  1. Page doesn't exists
            //  2. Page does exist in a different zone
            //  3. Internal error while loading the page
            // So, doing a hard reload is the proper way to deal with this.
            window.location.href = as;
            // Changing the URL doesn't block executing the current code path.
            // So let's throw a cancellation error stop the routing logic.
            throw buildCancellationError();
        }
        try {
            let Component;
            let styleSheets;
            let props;
            if (typeof Component === "undefined" || typeof styleSheets === "undefined") {
                ({ page: Component , styleSheets  } = await this.fetchComponent("/_error"));
            }
            const routeInfo = {
                props,
                Component,
                styleSheets,
                err,
                error: err
            };
            if (!routeInfo.props) {
                try {
                    routeInfo.props = await this.getInitialProps(Component, {
                        err,
                        pathname,
                        query
                    });
                } catch (gipErr) {
                    console.error("Error in error page `getInitialProps`: ", gipErr);
                    routeInfo.props = {};
                }
            }
            return routeInfo;
        } catch (routeInfoErr) {
            return this.handleRouteInfoError((0, _isError).default(routeInfoErr) ? routeInfoErr : new Error(routeInfoErr + ""), pathname, query, as, routeProps, true);
        }
    }
    async getRouteInfo(route, pathname, query, as, resolvedAs, routeProps, locale, isPreview) {
        try {
            const existingRouteInfo = this.components[route];
            if (routeProps.shallow && existingRouteInfo && this.route === route) {
                return existingRouteInfo;
            }
            let cachedRouteInfo = undefined;
            // can only use non-initial route info
            // cannot reuse route info in development since it can change after HMR
            if ( true && existingRouteInfo && !("initial" in existingRouteInfo)) {
                cachedRouteInfo = existingRouteInfo;
            }
            const routeInfo = cachedRouteInfo || await this.fetchComponent(route).then((res)=>({
                    Component: res.page,
                    styleSheets: res.styleSheets,
                    __N_SSG: res.mod.__N_SSG,
                    __N_SSP: res.mod.__N_SSP,
                    __N_RSC: !!res.mod.__next_rsc__
                })
            );
            const { Component , __N_SSG , __N_SSP , __N_RSC  } = routeInfo;
            if (false) {}
            let dataHref;
            // For server components, non-SSR pages will have statically optimized
            // flight data in a production build.
            // So only development and SSR pages will always have the real-time
            // generated and streamed flight data.
            const useStreamedFlightData = ( false || __N_SSP) && __N_RSC;
            if (__N_SSG || __N_SSP || __N_RSC) {
                dataHref = this.pageLoader.getDataHref({
                    href: (0, _formatUrl).formatWithValidation({
                        pathname,
                        query
                    }),
                    asPath: resolvedAs,
                    ssg: __N_SSG,
                    flight: useStreamedFlightData,
                    locale
                });
            }
            const props = await this._getData(()=>(__N_SSG || __N_SSP || __N_RSC) && !useStreamedFlightData ? fetchNextData(dataHref, this.isSsr, false, __N_SSG ? this.sdc : this.sdr, !!__N_SSG && !isPreview) : this.getInitialProps(Component, {
                    pathname,
                    query,
                    asPath: as,
                    locale,
                    locales: this.locales,
                    defaultLocale: this.defaultLocale
                })
            );
            if (__N_RSC) {
                if (useStreamedFlightData) {
                    const { data  } = await this._getData(()=>this._getFlightData(dataHref)
                    );
                    props.pageProps = Object.assign(props.pageProps, {
                        __flight__: data
                    });
                } else {
                    const { __flight__  } = props;
                    props.pageProps = Object.assign({}, props.pageProps, {
                        __flight__
                    });
                }
            }
            routeInfo.props = props;
            this.components[route] = routeInfo;
            return routeInfo;
        } catch (err) {
            return this.handleRouteInfoError((0, _isError).getProperError(err), pathname, query, as, routeProps);
        }
    }
    set(state, data, resetScroll) {
        this.state = state;
        return this.sub(data, this.components["/_app"].Component, resetScroll);
    }
    /**
   * Callback to execute before replacing router state
   * @param cb callback to be executed
   */ beforePopState(cb) {
        this._bps = cb;
    }
    onlyAHashChange(as) {
        if (!this.asPath) return false;
        const [oldUrlNoHash, oldHash] = this.asPath.split("#");
        const [newUrlNoHash, newHash] = as.split("#");
        // Makes sure we scroll to the provided hash if the url/hash are the same
        if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
            return true;
        }
        // If the urls are change, there's more than a hash change
        if (oldUrlNoHash !== newUrlNoHash) {
            return false;
        }
        // If the hash has changed, then it's a hash only change.
        // This check is necessary to handle both the enter and
        // leave hash === '' cases. The identity case falls through
        // and is treated as a next reload.
        return oldHash !== newHash;
    }
    scrollToHash(as) {
        const [, hash = ""] = as.split("#");
        // Scroll to top if the hash is just `#` with no value or `#top`
        // To mirror browsers
        if (hash === "" || hash === "top") {
            window.scrollTo(0, 0);
            return;
        }
        // First we check if the element by id is found
        const idEl = document.getElementById(hash);
        if (idEl) {
            idEl.scrollIntoView();
            return;
        }
        // If there's no element with the id, we check the `name` property
        // To mirror browsers
        const nameEl = document.getElementsByName(hash)[0];
        if (nameEl) {
            nameEl.scrollIntoView();
        }
    }
    urlIsNew(asPath) {
        return this.asPath !== asPath;
    }
    /**
   * Prefetch page code, you may wait for the data during page rendering.
   * This feature only works in production!
   * @param url the href of prefetched page
   * @param asPath the as path of the prefetched page
   */ async prefetch(url, asPath = url, options = {}) {
        let parsed = (0, _parseRelativeUrl).parseRelativeUrl(url);
        let { pathname , query  } = parsed;
        if (false) {}
        const pages = await this.pageLoader.getPageList();
        let resolvedAs = asPath;
        if (false) {} else {
            parsed.pathname = resolveDynamicRoute(parsed.pathname, pages);
            if (parsed.pathname !== pathname) {
                pathname = parsed.pathname;
                parsed.pathname = pathname;
                url = (0, _formatUrl).formatWithValidation(parsed);
            }
        }
        // Prefetch is not supported in development mode because it would trigger on-demand-entries
        if (false) {}
        const effects = await this._preflightRequest({
            as: addBasePath(asPath),
            cache: true,
            pages,
            pathname,
            query,
            locale: this.locale,
            isPreview: this.isPreview
        });
        if (effects.type === "rewrite") {
            parsed.pathname = effects.resolvedHref;
            pathname = effects.resolvedHref;
            query = {
                ...query,
                ...effects.parsedAs.query
            };
            resolvedAs = effects.asPath;
            url = (0, _formatUrl).formatWithValidation(parsed);
        }
        const route = (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname);
        await Promise.all([
            this.pageLoader._isSsg(route).then((isSsg)=>{
                return isSsg ? fetchNextData(this.pageLoader.getDataHref({
                    href: url,
                    asPath: resolvedAs,
                    ssg: true,
                    locale: typeof options.locale !== "undefined" ? options.locale : this.locale
                }), false, false, this.sdc, true) : false;
            }),
            this.pageLoader[options.priority ? "loadPage" : "prefetch"](route), 
        ]);
    }
    async fetchComponent(route) {
        let cancelled = false;
        const cancel = this.clc = ()=>{
            cancelled = true;
        };
        const handleCancelled = ()=>{
            if (cancelled) {
                const error = new Error(`Abort fetching component for route: "${route}"`);
                error.cancelled = true;
                throw error;
            }
            if (cancel === this.clc) {
                this.clc = null;
            }
        };
        try {
            const componentResult = await this.pageLoader.loadPage(route);
            handleCancelled();
            return componentResult;
        } catch (err) {
            handleCancelled();
            throw err;
        }
    }
    _getData(fn) {
        let cancelled = false;
        const cancel = ()=>{
            cancelled = true;
        };
        this.clc = cancel;
        return fn().then((data)=>{
            if (cancel === this.clc) {
                this.clc = null;
            }
            if (cancelled) {
                const err = new Error("Loading initial props cancelled");
                err.cancelled = true;
                throw err;
            }
            return data;
        });
    }
    _getFlightData(dataHref) {
        // Do not cache RSC flight response since it's not a static resource
        return fetchNextData(dataHref, true, true, this.sdc, false).then((serialized)=>{
            return {
                data: serialized
            };
        });
    }
    async _preflightRequest(options) {
        const asPathname = pathNoQueryHash(options.as);
        const cleanedAs = delLocale(hasBasePath(asPathname) ? delBasePath(asPathname) : asPathname, options.locale);
        const fns = await this.pageLoader.getMiddlewareList();
        const requiresPreflight = fns.some(([middleware, isSSR])=>{
            return (0, _routeMatcher).getRouteMatcher((0, _getMiddlewareRegex).getMiddlewareRegex(middleware, !isSSR))(cleanedAs);
        });
        if (!requiresPreflight) {
            return {
                type: "next"
            };
        }
        const preflightHref = addLocale(options.as, options.locale);
        let preflight;
        try {
            preflight = await this._getPreflightData({
                preflightHref,
                shouldCache: options.cache,
                isPreview: options.isPreview
            });
        } catch (err) {
            // If preflight request fails, we need to do a hard-navigation.
            return {
                type: "redirect",
                destination: options.as
            };
        }
        if (preflight.rewrite) {
            // for external rewrites we need to do a hard navigation
            // to the resource
            if (!preflight.rewrite.startsWith("/")) {
                return {
                    type: "redirect",
                    destination: options.as
                };
            }
            const parsed = (0, _parseRelativeUrl).parseRelativeUrl((0, _normalizeLocalePath).normalizeLocalePath(hasBasePath(preflight.rewrite) ? delBasePath(preflight.rewrite) : preflight.rewrite, this.locales).pathname);
            const fsPathname = (0, _normalizeTrailingSlash).removePathTrailingSlash(parsed.pathname);
            let matchedPage;
            let resolvedHref;
            if (options.pages.includes(fsPathname)) {
                matchedPage = true;
                resolvedHref = fsPathname;
            } else {
                resolvedHref = resolveDynamicRoute(fsPathname, options.pages);
                if (resolvedHref !== parsed.pathname && options.pages.includes(resolvedHref)) {
                    matchedPage = true;
                }
            }
            return {
                type: "rewrite",
                asPath: parsed.pathname,
                parsedAs: parsed,
                matchedPage,
                resolvedHref
            };
        }
        if (preflight.redirect) {
            if (preflight.redirect.startsWith("/")) {
                const cleanRedirect = (0, _normalizeTrailingSlash).removePathTrailingSlash((0, _normalizeLocalePath).normalizeLocalePath(hasBasePath(preflight.redirect) ? delBasePath(preflight.redirect) : preflight.redirect, this.locales).pathname);
                const { url: newUrl , as: newAs  } = prepareUrlAs(this, cleanRedirect, cleanRedirect);
                return {
                    type: "redirect",
                    newUrl,
                    newAs
                };
            }
            return {
                type: "redirect",
                destination: preflight.redirect
            };
        }
        // For SSR requests, they will be handled like normal pages.
        if (preflight.refresh && !preflight.ssr) {
            return {
                type: "refresh"
            };
        }
        return {
            type: "next"
        };
    }
    _getPreflightData(params) {
        const { preflightHref , shouldCache =false , isPreview  } = params;
        const { href: cacheKey  } = new URL(preflightHref, window.location.href);
        if ( true && !isPreview && shouldCache && this.sde[cacheKey]) {
            return Promise.resolve(this.sde[cacheKey]);
        }
        return fetch(preflightHref, {
            method: "HEAD",
            credentials: "same-origin",
            headers: {
                "x-middleware-preflight": "1"
            }
        }).then((res)=>{
            if (!res.ok) {
                throw new Error(`Failed to preflight request`);
            }
            return {
                cache: res.headers.get("x-middleware-cache"),
                redirect: res.headers.get("Location"),
                refresh: res.headers.has("x-middleware-refresh"),
                rewrite: res.headers.get("x-middleware-rewrite"),
                ssr: !!res.headers.get("x-middleware-ssr")
            };
        }).then((data)=>{
            if (shouldCache && data.cache !== "no-cache") {
                this.sde[cacheKey] = data;
            }
            return data;
        }).catch((err)=>{
            delete this.sde[cacheKey];
            throw err;
        });
    }
    getInitialProps(Component, ctx) {
        const { Component: App  } = this.components["/_app"];
        const AppTree = this._wrapApp(App);
        ctx.AppTree = AppTree;
        return (0, _utils).loadGetInitialProps(App, {
            AppTree,
            Component,
            router: this,
            ctx
        });
    }
    abortComponentLoad(as, routeProps) {
        if (this.clc) {
            Router.events.emit("routeChangeError", buildCancellationError(), as, routeProps);
            this.clc();
            this.clc = null;
        }
    }
    get route() {
        return this.state.route;
    }
    get pathname() {
        return this.state.pathname;
    }
    get query() {
        return this.state.query;
    }
    get asPath() {
        return this.state.asPath;
    }
    get locale() {
        return this.state.locale;
    }
    get isFallback() {
        return this.state.isFallback;
    }
    get isPreview() {
        return this.state.isPreview;
    }
}
exports["default"] = Router;
Router.events = (0, _mitt).default(); //# sourceMappingURL=router.js.map


/***/ }),

/***/ 96840:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.formatUrl = formatUrl;
exports.formatWithValidation = formatWithValidation;
exports.urlObjectKeys = void 0;
var querystring = _interopRequireWildcard(__webpack_require__(40042));
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth , hostname  } = urlObj;
    let protocol = urlObj.protocol || "";
    let pathname = urlObj.pathname || "";
    let hash = urlObj.hash || "";
    let query = urlObj.query || "";
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ":") + "@" : "";
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(":") ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ":" + urlObj.port;
        }
    }
    if (query && typeof query === "object") {
        query = String(querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || "";
    if (protocol && !protocol.endsWith(":")) protocol += ":";
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = "//" + (host || "");
        if (pathname && pathname[0] !== "/") pathname = "/" + pathname;
    } else if (!host) {
        host = "";
    }
    if (hash && hash[0] !== "#") hash = "#" + hash;
    if (search && search[0] !== "?") search = "?" + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace("#", "%23");
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    "auth",
    "hash",
    "host",
    "hostname",
    "href",
    "path",
    "pathname",
    "port",
    "protocol",
    "query",
    "search",
    "slashes", 
];
exports.urlObjectKeys = urlObjectKeys;
function formatWithValidation(url) {
    if (false) {}
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map


/***/ }),

/***/ 76830:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = getAssetPathFromRoute;
function getAssetPathFromRoute(route, ext = "") {
    const path = route === "/" ? "/index" : /^\/index(\/|$)/.test(route) ? `/index${route}` : `${route}`;
    return path + ext;
} //# sourceMappingURL=get-asset-path-from-route.js.map


/***/ }),

/***/ 50016:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = resolveRewrites;
var _pathMatch = __webpack_require__(5906);
var _prepareDestination = __webpack_require__(83803);
var _normalizeTrailingSlash = __webpack_require__(8051);
var _normalizeLocalePath = __webpack_require__(20852);
var _parseRelativeUrl = __webpack_require__(33505);
var _router = __webpack_require__(93119);
function resolveRewrites(asPath, pages, rewrites, query, resolveHref, locales) {
    let matchedPage = false;
    let externalDest = false;
    let parsedAs = (0, _parseRelativeUrl).parseRelativeUrl(asPath);
    let fsPathname = (0, _normalizeTrailingSlash).removePathTrailingSlash((0, _normalizeLocalePath).normalizeLocalePath((0, _router).delBasePath(parsedAs.pathname), locales).pathname);
    let resolvedHref;
    const handleRewrite = (rewrite)=>{
        const matcher = (0, _pathMatch).getPathMatch(rewrite.source, {
            removeUnnamedParams: true,
            strict: true
        });
        let params = matcher(parsedAs.pathname);
        if (rewrite.has && params) {
            const hasParams = (0, _prepareDestination).matchHas({
                headers: {
                    host: document.location.hostname
                },
                cookies: document.cookie.split("; ").reduce((acc, item)=>{
                    const [key, ...value] = item.split("=");
                    acc[key] = value.join("=");
                    return acc;
                }, {})
            }, rewrite.has, parsedAs.query);
            if (hasParams) {
                Object.assign(params, hasParams);
            } else {
                params = false;
            }
        }
        if (params) {
            if (!rewrite.destination) {
                // this is a proxied rewrite which isn't handled on the client
                externalDest = true;
                return true;
            }
            const destRes = (0, _prepareDestination).prepareDestination({
                appendParamsToQuery: true,
                destination: rewrite.destination,
                params: params,
                query: query
            });
            parsedAs = destRes.parsedDestination;
            asPath = destRes.newUrl;
            Object.assign(query, destRes.parsedDestination.query);
            fsPathname = (0, _normalizeTrailingSlash).removePathTrailingSlash((0, _normalizeLocalePath).normalizeLocalePath((0, _router).delBasePath(asPath), locales).pathname);
            if (pages.includes(fsPathname)) {
                // check if we now match a page as this means we are done
                // resolving the rewrites
                matchedPage = true;
                resolvedHref = fsPathname;
                return true;
            }
            // check if we match a dynamic-route, if so we break the rewrites chain
            resolvedHref = resolveHref(fsPathname);
            if (resolvedHref !== asPath && pages.includes(resolvedHref)) {
                matchedPage = true;
                return true;
            }
        }
    };
    let finished = false;
    for(let i = 0; i < rewrites.beforeFiles.length; i++){
        // we don't end after match in beforeFiles to allow
        // continuing through all beforeFiles rewrites
        handleRewrite(rewrites.beforeFiles[i]);
    }
    matchedPage = pages.includes(fsPathname);
    if (!matchedPage) {
        if (!finished) {
            for(let i = 0; i < rewrites.afterFiles.length; i++){
                if (handleRewrite(rewrites.afterFiles[i])) {
                    finished = true;
                    break;
                }
            }
        }
        // check dynamic route before processing fallback rewrites
        if (!finished) {
            resolvedHref = resolveHref(fsPathname);
            matchedPage = pages.includes(resolvedHref);
            finished = matchedPage;
        }
        if (!finished) {
            for(let i = 0; i < rewrites.fallback.length; i++){
                if (handleRewrite(rewrites.fallback[i])) {
                    finished = true;
                    break;
                }
            }
        }
    }
    return {
        asPath,
        parsedAs,
        matchedPage,
        resolvedHref,
        externalDest
    };
} //# sourceMappingURL=resolve-rewrites.js.map


/***/ }),

/***/ 32959:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(60763));
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
const isServer = "undefined" === "undefined";
class _class extends _react.Component {
    constructor(props){
        super(props);
        this.emitChange = ()=>{
            if (this._hasHeadManager) {
                this.props.headManager.updateHead(this.props.reduceComponentsToState([
                    ...this.props.headManager.mountedInstances
                ], this.props));
            }
        };
        this._hasHeadManager = this.props.headManager && this.props.headManager.mountedInstances;
        if (isServer && this._hasHeadManager) {
            this.props.headManager.mountedInstances.add(this);
            this.emitChange();
        }
    }
    componentDidMount() {
        if (this._hasHeadManager) {
            this.props.headManager.mountedInstances.add(this);
        }
        this.emitChange();
    }
    componentDidUpdate() {
        this.emitChange();
    }
    componentWillUnmount() {
        if (this._hasHeadManager) {
            this.props.headManager.mountedInstances.delete(this);
        }
        this.emitChange();
    }
    render() {
        return null;
    }
}
exports["default"] = _class; //# sourceMappingURL=side-effect.js.map


/***/ }),

/***/ 45525:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unused reexport */ __webpack_require__(96183)


/***/ }),

/***/ 96821:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unused reexport */ __webpack_require__(97479)


/***/ }),

/***/ 82112:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l=Symbol.for("react.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z=Symbol.iterator;function A(a){if(null===a||"object"!==typeof a)return null;a=z&&a[z]||a["@@iterator"];return"function"===typeof a?a:null}
var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,D={};function E(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}E.prototype.isReactComponent={};
E.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}var H=G.prototype=new F;
H.constructor=G;C(H,E.prototype);H.isPureReactComponent=!0;var I=Array.isArray,J=Object.prototype.hasOwnProperty,K={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f}if(a&&a.defaultProps)for(d in g=a.defaultProps,g)void 0===c[d]&&(c[d]=g[d]);return{$$typeof:l,type:a,key:k,ref:h,props:c,_owner:K.current}}
function N(a,b){return{$$typeof:l,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===l}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g;function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function R(a,b,e,d,c){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case l:case n:h=!0}}if(h)return h=a,c=c(h),a=""===d?"."+Q(h,0):d,I(c)?(e="",null!=a&&(e=a.replace(P,"$&/")+"/"),R(c,b,e,"",function(a){return a})):null!=c&&(O(c)&&(c=N(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+a)),b.push(c)),1;h=0;d=""===d?".":d+":";if(I(a))for(var g=0;g<a.length;g++){k=
a[g];var f=d+Q(k,g);h+=R(k,b,e,f,c)}else if(f=A(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=d+Q(k,g++),h+=R(k,b,e,f,c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}
function S(a,b,e){if(null==a)return a;var d=[],c=0;R(a,d,"","",function(a){return b.call(e,a,c++)});return d}function T(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}
var U={current:null},V={transition:null},W={ReactCurrentDispatcher:U,ReactCurrentBatchConfig:V,ReactCurrentOwner:K};exports.Children={map:S,forEach:function(a,b,e){S(a,function(){b.apply(this,arguments)},e)},count:function(a){var b=0;S(a,function(){b++});return b},toArray:function(a){return S(a,function(a){return a})||[]},only:function(a){if(!O(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};exports.Component=E;exports.Fragment=p;
exports.Profiler=r;exports.PureComponent=G;exports.StrictMode=q;exports.Suspense=w;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W;
exports.cloneElement=function(a,b,e){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var d=C({},a.props),c=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=K.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)J.call(b,f)&&!L.hasOwnProperty(f)&&(d[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){g=Array(f);
for(var m=0;m<f;m++)g[m]=arguments[m+2];d.children=g}return{$$typeof:l,type:a.type,key:c,ref:k,props:d,_owner:h}};exports.createContext=function(a){a={$$typeof:u,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:t,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};
exports.forwardRef=function(a){return{$$typeof:v,render:a}};exports.isValidElement=O;exports.lazy=function(a){return{$$typeof:y,_payload:{_status:-1,_result:a},_init:T}};exports.memo=function(a,b){return{$$typeof:x,type:a,compare:void 0===b?null:b}};exports.startTransition=function(a){var b=V.transition;V.transition={};try{a()}finally{V.transition=b}};exports.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.");};
exports.useCallback=function(a,b){return U.current.useCallback(a,b)};exports.useContext=function(a){return U.current.useContext(a)};exports.useDebugValue=function(){};exports.useDeferredValue=function(a){return U.current.useDeferredValue(a)};exports.useEffect=function(a,b){return U.current.useEffect(a,b)};exports.useId=function(){return U.current.useId()};exports.useImperativeHandle=function(a,b,e){return U.current.useImperativeHandle(a,b,e)};
exports.useInsertionEffect=function(a,b){return U.current.useInsertionEffect(a,b)};exports.useLayoutEffect=function(a,b){return U.current.useLayoutEffect(a,b)};exports.useMemo=function(a,b){return U.current.useMemo(a,b)};exports.useReducer=function(a,b,e){return U.current.useReducer(a,b,e)};exports.useRef=function(a){return U.current.useRef(a)};exports.useState=function(a){return U.current.useState(a)};exports.useSyncExternalStore=function(a,b,e){return U.current.useSyncExternalStore(a,b,e)};
exports.useTransition=function(){return U.current.useTransition()};exports.version="18.2.0";


/***/ }),

/***/ 60763:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(82112);
} else {}


/***/ }),

/***/ 76364:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "pR": () => (/* binding */ cookie),
  "eI": () => (/* binding */ createClient),
  "_k": () => (/* binding */ getRepositoryName)
});

// UNUSED EXPORTS: Client, ForbiddenError, NotFoundError, ParsingError, Predicates, PrismicError, buildQueryURL, getEndpoint, getGraphQLEndpoint, getRepositoryEndpoint, isRepositoryEndpoint, isRepositoryName, predicate, predicates

;// CONCATENATED MODULE: ./node_modules/@prismicio/types/dist/index.js
const dist_RichTextNodeType = {
  heading1: "heading1",
  heading2: "heading2",
  heading3: "heading3",
  heading4: "heading4",
  heading5: "heading5",
  heading6: "heading6",
  paragraph: "paragraph",
  preformatted: "preformatted",
  strong: "strong",
  em: "em",
  listItem: "list-item",
  oListItem: "o-list-item",
  list: "group-list-item",
  oList: "group-o-list-item",
  image: "image",
  embed: "embed",
  hyperlink: "hyperlink",
  label: "label",
  span: "span"
};
const dist_LinkType = {
  Any: "Any",
  Document: "Document",
  Media: "Media",
  Web: "Web"
};
const OEmbedType = {
  Photo: "photo",
  Video: "video",
  Link: "link",
  Rich: "rich"
};

const CustomTypeModelFieldType = {
  Boolean: "Boolean",
  Color: "Color",
  Date: "Date",
  Embed: "Embed",
  GeoPoint: "GeoPoint",
  Group: "Group",
  Image: "Image",
  IntegrationFields: "IntegrationFields",
  Link: "Link",
  Number: "Number",
  Select: "Select",
  Slices: "Slices",
  StructuredText: "StructuredText",
  Text: "Text",
  Timestamp: "Timestamp",
  UID: "UID"
};
const CustomTypeModelLinkSelectType = {
  Document: "document",
  Media: "media"
};
const CustomTypeModelSliceDisplay = {
  List: "list",
  Grid: "grid"
};
const CustomTypeModelSliceType = {
  Slice: "Slice",
  SharedSlice: "SharedSlice"
};

const WebhookType = {
  APIUpdate: "api-update",
  TestTrigger: "test-trigger"
};

const EmbedType = (/* unused pure expression or super */ null && (OEmbedType));


//# sourceMappingURL=index.js.map

// EXTERNAL MODULE: ./node_modules/escape-html/index.js
var escape_html = __webpack_require__(37502);
;// CONCATENATED MODULE: ./node_modules/@prismicio/helpers/dist/index.js






const asDate = (dateOrTimestampField) => {
  if (!dateOrTimestampField) {
    return null;
  }
  if (dateOrTimestampField.length === 24) {
    return new Date(dateOrTimestampField.replace(/(\+|-)(\d{2})(\d{2})$/, ".000$1$2:$3"));
  } else {
    return new Date(dateOrTimestampField);
  }
};

const documentToLinkField = (prismicDocument) => {
  var _a, _b, _c;
  return {
    link_type: dist_LinkType.Document,
    id: prismicDocument.id,
    uid: (_a = prismicDocument.uid) != null ? _a : void 0,
    type: prismicDocument.type,
    tags: prismicDocument.tags,
    lang: prismicDocument.lang,
    url: (_b = prismicDocument.url) != null ? _b : void 0,
    slug: (_c = prismicDocument.slugs) == null ? void 0 : _c[0],
    ...prismicDocument.data && Object.keys(prismicDocument.data).length > 0 ? { data: prismicDocument.data } : {}
  };
};

const asLink = (linkFieldOrDocument, linkResolver) => {
  if (!linkFieldOrDocument) {
    return null;
  }
  const linkField = "link_type" in linkFieldOrDocument ? linkFieldOrDocument : documentToLinkField(linkFieldOrDocument);
  switch (linkField.link_type) {
    case dist_LinkType.Media:
    case dist_LinkType.Web:
      return "url" in linkField ? linkField.url : null;
    case dist_LinkType.Document: {
      if ("id" in linkField && linkResolver) {
        const resolvedURL = linkResolver(linkField);
        if (resolvedURL != null) {
          return resolvedURL;
        }
      }
      if ("url" in linkField && linkField.url) {
        return linkField.url;
      }
      return null;
    }
    case dist_LinkType.Any:
    default:
      return null;
  }
};

const asText = (richTextField, separator) => {
  if (richTextField) {
    return asText$1(richTextField, separator);
  } else {
    return null;
  }
};

const getLabel = (node) => {
  return "data" in node && "label" in node.data ? ` class="${node.data.label}"` : "";
};
const serializeStandardTag = (tag, node, children) => {
  return `<${tag}${getLabel(node)}>${children.join("")}</${tag}>`;
};
const serializePreFormatted = (node) => {
  return `<pre${getLabel(node)}>${escapeHtml(node.text)}</pre>`;
};
const serializeImage = (linkResolver, node) => {
  let imageTag = `<img src="${node.url}" alt="${escapeHtml(node.alt)}"${node.copyright ? ` copyright="${escapeHtml(node.copyright)}"` : ""} />`;
  if (node.linkTo) {
    imageTag = serializeHyperlink(linkResolver, {
      type: RichTextNodeType.hyperlink,
      data: node.linkTo,
      start: 0,
      end: 0
    }, [imageTag]);
  }
  return `<p class="block-img">${imageTag}</p>`;
};
const serializeEmbed = (node) => {
  return `<div data-oembed="${node.oembed.embed_url}" data-oembed-type="${node.oembed.type}" data-oembed-provider="${node.oembed.provider_name}"${getLabel(node)}>${node.oembed.html}</div>`;
};
const serializeHyperlink = (linkResolver, node, children) => {
  switch (node.data.link_type) {
    case LinkType.Web: {
      return `<a href="${escapeHtml(node.data.url)}" target="${node.data.target}" rel="noopener noreferrer"${getLabel(node)}>${children.join("")}</a>`;
    }
    case LinkType.Document: {
      return `<a href="${asLink(node.data, linkResolver)}"${getLabel(node)}>${children.join("")}</a>`;
    }
    case LinkType.Media: {
      return `<a href="${node.data.url}"${getLabel(node)}>${children.join("")}</a>`;
    }
  }
};
const serializeSpan = (content) => {
  return content ? escapeHtml(content).replace(/\n/g, "<br />") : "";
};

const createDefaultHTMLSerializer = (linkResolver) => {
  return (_type, node, text, children, _key) => {
    switch (node.type) {
      case Element.heading1:
        return serializeStandardTag("h1", node, children);
      case Element.heading2:
        return serializeStandardTag("h2", node, children);
      case Element.heading3:
        return serializeStandardTag("h3", node, children);
      case Element.heading4:
        return serializeStandardTag("h4", node, children);
      case Element.heading5:
        return serializeStandardTag("h5", node, children);
      case Element.heading6:
        return serializeStandardTag("h6", node, children);
      case Element.paragraph:
        return serializeStandardTag("p", node, children);
      case Element.preformatted:
        return serializePreFormatted(node);
      case Element.strong:
        return serializeStandardTag("strong", node, children);
      case Element.em:
        return serializeStandardTag("em", node, children);
      case Element.listItem:
        return serializeStandardTag("li", node, children);
      case Element.oListItem:
        return serializeStandardTag("li", node, children);
      case Element.list:
        return serializeStandardTag("ul", node, children);
      case Element.oList:
        return serializeStandardTag("ol", node, children);
      case Element.image:
        return serializeImage(linkResolver, node);
      case Element.embed:
        return serializeEmbed(node);
      case Element.hyperlink:
        return serializeHyperlink(linkResolver, node, children);
      case Element.label:
        return serializeStandardTag("span", node, children);
      case Element.span:
      default:
        return serializeSpan(text);
    }
  };
};
const wrapMapSerializerWithStringChildren = (mapSerializer) => {
  const modifiedMapSerializer = {};
  for (const tag in mapSerializer) {
    const tagSerializer = mapSerializer[tag];
    if (tagSerializer) {
      modifiedMapSerializer[tag] = (payload) => {
        return tagSerializer({
          ...payload,
          children: payload.children.join("")
        });
      };
    }
  }
  return wrapMapSerializer(modifiedMapSerializer);
};
const asHTML = (richTextField, linkResolver, htmlSerializer) => {
  if (richTextField) {
    let serializer;
    if (htmlSerializer) {
      serializer = composeSerializers(typeof htmlSerializer === "object" ? wrapMapSerializerWithStringChildren(htmlSerializer) : (type, node, text, children, key) => htmlSerializer(type, node, text, children.join(""), key), createDefaultHTMLSerializer(linkResolver));
    } else {
      serializer = createDefaultHTMLSerializer(linkResolver);
    }
    return serialize(richTextField, serializer).join("");
  } else {
    return null;
  }
};

const isNonNullish = (input) => {
  return input != null;
};
const isNonEmptyArray = (input) => {
  return !!input.length;
};
const richText = (field) => {
  if (!isNonNullish(field)) {
    return false;
  } else if (field.length === 1 && "text" in field[0]) {
    return !!field[0].text;
  } else {
    return !!field.length;
  }
};
const title = richText;
const imageThumbnail = (thumbnail) => {
  return isNonNullish(thumbnail) && !!thumbnail.url;
};
const dist_image = imageThumbnail;
const dist_link = (field) => {
  return isNonNullish(field) && ("id" in field || "url" in field);
};
const linkToMedia = dist_link;
const contentRelationship = dist_link;
const date = isNonNullish;
const timestamp = isNonNullish;
const color = isNonNullish;
const number = isNonNullish;
const keyText = (field) => {
  return isNonNullish(keyText) && !!field;
};
const dist_select = isNonNullish;
const dist_embed = (field) => {
  return isNonNullish(field) && !!field.embed_url;
};
const geoPoint = (field) => {
  return isNonNullish(field) && "longitude" in field;
};
const integrationFields = isNonNullish;
const group = (group2) => {
  return isNonNullish(group2) && isNonEmptyArray(group2);
};
const sliceZone = (slices) => {
  return isNonNullish(slices) && isNonEmptyArray(slices);
};

var isFilled = /*#__PURE__*/Object.freeze({
	__proto__: null,
	richText: richText,
	title: title,
	imageThumbnail: imageThumbnail,
	image: dist_image,
	link: dist_link,
	linkToMedia: linkToMedia,
	contentRelationship: contentRelationship,
	date: date,
	timestamp: timestamp,
	color: color,
	number: number,
	keyText: keyText,
	select: dist_select,
	embed: dist_embed,
	geoPoint: geoPoint,
	integrationFields: integrationFields,
	group: group,
	sliceZone: sliceZone
});

const asImageSrc = (field, params = {}) => {
  if (field && imageThumbnail(field)) {
    return buildURL(field.url, params);
  } else {
    return null;
  }
};

const DEFAULT_WIDTHS = (/* unused pure expression or super */ null && ([640, 828, 1200, 2048, 3840]));
const asImageWidthSrcSet = (field, params = {}) => {
  if (field && imageThumbnail(field)) {
    let {
      widths = DEFAULT_WIDTHS,
      ...imgixParams
    } = params;
    const {
      url,
      dimensions,
      alt: _alt,
      copyright: _copyright,
      ...responsiveViews
    } = field;
    const responsiveViewObjects = Object.values(responsiveViews);
    if (widths === "thumbnails" && responsiveViewObjects.length < 1) {
      widths = DEFAULT_WIDTHS;
    }
    return {
      src: buildURL(url, imgixParams),
      srcset: widths === "thumbnails" ? [
        buildWidthSrcSet(url, {
          ...imgixParams,
          widths: [dimensions.width]
        }),
        ...responsiveViewObjects.map((thumbnail) => {
          return buildWidthSrcSet(thumbnail.url, {
            ...imgixParams,
            widths: [thumbnail.dimensions.width]
          });
        })
      ].join(", ") : buildWidthSrcSet(field.url, {
        ...imgixParams,
        widths
      })
    };
  } else {
    return null;
  }
};

const DEFAULT_PIXEL_DENSITIES = (/* unused pure expression or super */ null && ([1, 2, 3]));
const asImagePixelDensitySrcSet = (field, params = {}) => {
  if (field && imageThumbnail(field)) {
    const { pixelDensities = DEFAULT_PIXEL_DENSITIES, ...imgixParams } = params;
    return {
      src: buildURL(field.url, imgixParams),
      srcset: buildPixelDensitySrcSet(field.url, {
        ...imgixParams,
        pixelDensities
      })
    };
  } else {
    return null;
  }
};

const Elements = (/* unused pure expression or super */ null && (Element));


//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@prismicio/client/dist/index.js


const isRepositoryName = (input) => {
  return /^[a-zA-Z0-9][-a-zA-Z0-9]{2,}[a-zA-Z0-9]$/.test(input);
};

class PrismicError extends Error {
  constructor(message = "An invalid API response was returned", url, response) {
    super(message);
    this.url = url;
    this.response = response;
  }
}

const getRepositoryEndpoint = (repositoryName) => {
  if (isRepositoryName(repositoryName)) {
    return `https://${repositoryName}.cdn.prismic.io/api/v2`;
  } else {
    throw new PrismicError(`An invalid Prismic repository name was given: ${repositoryName}`, void 0, void 0);
  }
};

const getRepositoryName = (repositoryEndpoint) => {
  try {
    return new URL(repositoryEndpoint).hostname.split(".")[0];
  } catch (e) {
    throw new PrismicError(`An invalid Prismic Rest API V2 endpoint was provided: ${repositoryEndpoint}`, void 0, void 0);
  }
};

const getGraphQLEndpoint = (repositoryName) => {
  if (isRepositoryName(repositoryName)) {
    return `https://${repositoryName}.cdn.prismic.io/graphql`;
  } else {
    throw new PrismicError(`An invalid Prismic repository name was given: ${repositoryName}`, void 0, void 0);
  }
};

const isRepositoryEndpoint = (input) => {
  try {
    new URL(input);
    return true;
  } catch (e) {
    return false;
  }
};

const castArray = (a) => Array.isArray(a) ? a : [a];

const RENAMED_PARAMS = {
  accessToken: "access_token"
};
const castOrderingToString = (ordering) => typeof ordering === "string" ? ordering : [
  ordering.field,
  ordering.direction === "desc" ? ordering.direction : void 0
].filter(Boolean).join(" ");
const buildQueryURL = (endpoint, args) => {
  var _a;
  const { predicates, ...params } = args;
  const url = new URL(`documents/search`, `${endpoint}/`);
  if (predicates) {
    for (const predicate of castArray(predicates)) {
      url.searchParams.append("q", `[${predicate}]`);
    }
  }
  for (const k in params) {
    const name = (_a = RENAMED_PARAMS[k]) != null ? _a : k;
    let value = params[k];
    if (name === "orderings") {
      const scopedValue = params[name];
      if (scopedValue != null) {
        const v = castArray(scopedValue).map((ordering) => castOrderingToString(ordering)).join(",");
        value = `[${v}]`;
      }
    } else if (name === "routes") {
      if (typeof params[name] === "object") {
        value = JSON.stringify(castArray(params[name]));
      }
    }
    if (value != null) {
      url.searchParams.set(name, castArray(value).join(","));
    }
  }
  return url.toString();
};

const appendPredicates = (objWithPredicates = {}, predicates) => {
  return {
    ...objWithPredicates,
    predicates: [
      ...objWithPredicates.predicates || [],
      ...castArray(predicates)
    ]
  };
};

const castThunk = (a) => typeof a === "function" ? a : () => a;

const findRef = (refs, predicate) => {
  const ref = refs.find((ref2) => predicate(ref2));
  if (!ref) {
    throw new PrismicError("Ref could not be found.", void 0, void 0);
  }
  return ref;
};

const findMasterRef = (refs) => {
  return findRef(refs, (ref) => ref.isMasterRef);
};

const findRefByID = (refs, id) => {
  return findRef(refs, (ref) => ref.id === id);
};

const findRefByLabel = (refs, label) => {
  return findRef(refs, (ref) => ref.label === label);
};

const readValue = (value) => {
  return value.replace(/%3B/g, ";");
};
const parse = (cookieString) => {
  const result = {};
  const cookies = cookieString.split("; ");
  for (const cookie of cookies) {
    const parts = cookie.split("=");
    const value = parts.slice(1).join("=");
    const name = readValue(parts[0]).replace(/%3D/g, "=");
    result[name] = readValue(value);
  }
  return result;
};
const getAll = (cookieStore) => parse(cookieStore);
const getCookie = (name, cookieJar) => getAll(cookieJar)[name];

const minifyGraphQLQuery = (query) => {
  return query.replace(/(\n| )*( |{|})(\n| )*/gm, (_chars, _spaces, brackets) => brackets);
};

const preview = "io.prismic.preview";

var cookie = /*#__PURE__*/Object.freeze({
	__proto__: null,
	preview: preview
});

class ForbiddenError extends PrismicError {
}

class NotFoundError extends PrismicError {
}

class ParsingError extends PrismicError {
}

const formatValue = (value) => {
  if (Array.isArray(value)) {
    return `[${value.map(formatValue).join(", ")}]`;
  }
  if (typeof value === "string") {
    return `"${value}"`;
  }
  if (value instanceof Date) {
    return `${value.getTime()}`;
  }
  return `${value}`;
};
const pathWithArgsPredicate = (name) => {
  const fn = (path, ...args) => {
    const formattedArgs = args.map(formatValue).join(", ");
    const joiner = path && args.length ? ", " : "";
    return `[${name}(${path}${joiner}${formattedArgs})]`;
  };
  return fn;
};
const pathPredicate = (name) => {
  const predicateFn = pathWithArgsPredicate(name);
  const fn = (path) => {
    return predicateFn(path);
  };
  return fn;
};
const argsPredicate = (name) => {
  const predicateFn = pathWithArgsPredicate(name);
  const fn = (...args) => {
    return predicateFn("", ...args);
  };
  return fn;
};
const predicate = {
  at: pathWithArgsPredicate("at"),
  not: pathWithArgsPredicate("not"),
  any: pathWithArgsPredicate("any"),
  in: pathWithArgsPredicate("in"),
  fulltext: pathWithArgsPredicate("fulltext"),
  has: pathPredicate("has"),
  missing: pathPredicate("missing"),
  similar: argsPredicate("similar"),
  geopointNear: pathWithArgsPredicate("geopoint.near"),
  numberLessThan: pathWithArgsPredicate("number.lt"),
  numberGreaterThan: pathWithArgsPredicate("number.gt"),
  numberInRange: pathWithArgsPredicate("number.inRange"),
  dateAfter: pathWithArgsPredicate("date.after"),
  dateBefore: pathWithArgsPredicate("date.before"),
  dateBetween: pathWithArgsPredicate("date.between"),
  dateDayOfMonth: pathWithArgsPredicate("date.day-of-month"),
  dateDayOfMonthAfter: pathWithArgsPredicate("date.day-of-month-after"),
  dateDayOfMonthBefore: pathWithArgsPredicate("date.day-of-month-before"),
  dateDayOfWeek: pathWithArgsPredicate("date.day-of-week"),
  dateDayOfWeekAfter: pathWithArgsPredicate("date.day-of-week-after"),
  dateDayOfWeekBefore: pathWithArgsPredicate("date.day-of-week-before"),
  dateMonth: pathWithArgsPredicate("date.month"),
  dateMonthAfter: pathWithArgsPredicate("date.month-after"),
  dateMonthBefore: pathWithArgsPredicate("date.month-before"),
  dateYear: pathWithArgsPredicate("date.year"),
  dateHour: pathWithArgsPredicate("date.hour"),
  dateHourAfter: pathWithArgsPredicate("date.hour-after"),
  dateHourBefore: pathWithArgsPredicate("date.hour-before")
};

const MAX_PAGE_SIZE = 100;
const REPOSITORY_CACHE_TTL = 5e3;
const GET_ALL_QUERY_DELAY = 500;
const typePredicate = (documentType) => predicate.at("document.type", documentType);
const everyTagPredicate = (tags) => predicate.at("document.tags", castArray(tags));
const someTagsPredicate = (tags) => predicate.any("document.tags", castArray(tags));
const createClient = (repositoryNameOrEndpoint, options) => new Client(repositoryNameOrEndpoint, options);
class Client {
  constructor(repositoryNameOrEndpoint, options = {}) {
    this.refState = {
      mode: "Master" /* Master */,
      autoPreviewsEnabled: true
    };
    this.cachedRepositoryExpiration = 0;
    this.graphqlFetch = this.graphQLFetch.bind(this);
    if (isRepositoryEndpoint(repositoryNameOrEndpoint)) {
      if (false) {}
      this.endpoint = repositoryNameOrEndpoint;
    } else {
      this.endpoint = getRepositoryEndpoint(repositoryNameOrEndpoint);
    }
    this.accessToken = options.accessToken;
    this.routes = options.routes;
    this.defaultParams = options.defaultParams;
    if (options.ref) {
      this.queryContentFromRef(options.ref);
    }
    if (typeof options.fetch === "function") {
      this.fetchFn = options.fetch;
    } else if (typeof globalThis.fetch === "function") {
      this.fetchFn = globalThis.fetch;
    } else {
      throw new PrismicError("A valid fetch implementation was not provided. In environments where fetch is not available (including Node.js), a fetch implementation must be provided via a polyfill or the `fetch` option.", void 0, void 0);
    }
    if (this.fetchFn === globalThis.fetch) {
      this.fetchFn = this.fetchFn.bind(globalThis);
    }
    this.graphQLFetch = this.graphQLFetch.bind(this);
  }
  enableAutoPreviews() {
    this.refState.autoPreviewsEnabled = true;
  }
  enableAutoPreviewsFromReq(req) {
    this.refState.httpRequest = req;
    this.refState.autoPreviewsEnabled = true;
  }
  disableAutoPreviews() {
    this.refState.autoPreviewsEnabled = false;
  }
  async query(predicates, params) {
    const url = await this.buildQueryURL({ ...params, predicates });
    return await this.fetch(url, params);
  }
  async get(params) {
    const url = await this.buildQueryURL(params);
    return await this.fetch(url, params);
  }
  async getFirst(params) {
    const url = await this.buildQueryURL(params);
    const result = await this.fetch(url, params);
    const firstResult = result.results[0];
    if (firstResult) {
      return firstResult;
    }
    throw new PrismicError("No documents were returned", url, void 0);
  }
  async dangerouslyGetAll(params = {}) {
    var _a;
    const { limit = Infinity, ...actualParams } = params;
    const resolvedParams = {
      ...actualParams,
      pageSize: Math.min(limit, actualParams.pageSize || ((_a = this.defaultParams) == null ? void 0 : _a.pageSize) || MAX_PAGE_SIZE)
    };
    const documents = [];
    let latestResult;
    while ((!latestResult || latestResult.next_page) && documents.length < limit) {
      const page = latestResult ? latestResult.page + 1 : void 0;
      latestResult = await this.get({ ...resolvedParams, page });
      documents.push(...latestResult.results);
      if (latestResult.next_page) {
        await new Promise((res) => setTimeout(res, GET_ALL_QUERY_DELAY));
      }
    }
    return documents.slice(0, limit);
  }
  async getByID(id, params) {
    return await this.getFirst(appendPredicates(params, predicate.at("document.id", id)));
  }
  async getByIDs(ids, params) {
    return await this.get(appendPredicates(params, predicate.in("document.id", ids)));
  }
  async getAllByIDs(ids, params) {
    return await this.dangerouslyGetAll(appendPredicates(params, predicate.in("document.id", ids)));
  }
  async getByUID(documentType, uid, params) {
    return await this.getFirst(appendPredicates(params, [
      typePredicate(documentType),
      predicate.at(`my.${documentType}.uid`, uid)
    ]));
  }
  async getByUIDs(documentType, uids, params) {
    return await this.get(appendPredicates(params, [
      typePredicate(documentType),
      predicate.in(`my.${documentType}.uid`, uids)
    ]));
  }
  async getAllByUIDs(documentType, uids, params) {
    return await this.dangerouslyGetAll(appendPredicates(params, [
      typePredicate(documentType),
      predicate.in(`my.${documentType}.uid`, uids)
    ]));
  }
  async getSingle(documentType, params) {
    return await this.getFirst(appendPredicates(params, typePredicate(documentType)));
  }
  async getByType(documentType, params) {
    return await this.get(appendPredicates(params, typePredicate(documentType)));
  }
  async getAllByType(documentType, params) {
    return await this.dangerouslyGetAll(appendPredicates(params, typePredicate(documentType)));
  }
  async getByTag(tag, params) {
    return await this.get(appendPredicates(params, someTagsPredicate(tag)));
  }
  async getAllByTag(tag, params) {
    return await this.dangerouslyGetAll(appendPredicates(params, someTagsPredicate(tag)));
  }
  async getByEveryTag(tags, params) {
    return await this.get(appendPredicates(params, everyTagPredicate(tags)));
  }
  async getAllByEveryTag(tags, params) {
    return await this.dangerouslyGetAll(appendPredicates(params, everyTagPredicate(tags)));
  }
  async getBySomeTags(tags, params) {
    return await this.get(appendPredicates(params, someTagsPredicate(tags)));
  }
  async getAllBySomeTags(tags, params) {
    return await this.dangerouslyGetAll(appendPredicates(params, someTagsPredicate(tags)));
  }
  async getRepository(params) {
    const url = new URL(this.endpoint);
    if (this.accessToken) {
      url.searchParams.set("access_token", this.accessToken);
    }
    return await this.fetch(url.toString(), params);
  }
  async getRefs(params) {
    const repository = await this.getRepository(params);
    return repository.refs;
  }
  async getRefByID(id, params) {
    const refs = await this.getRefs(params);
    return findRefByID(refs, id);
  }
  async getRefByLabel(label, params) {
    const refs = await this.getRefs(params);
    return findRefByLabel(refs, label);
  }
  async getMasterRef(params) {
    const refs = await this.getRefs(params);
    return findMasterRef(refs);
  }
  async getReleases(params) {
    const refs = await this.getRefs(params);
    return refs.filter((ref) => !ref.isMasterRef);
  }
  async getReleaseByID(id, params) {
    const releases = await this.getReleases(params);
    return findRefByID(releases, id);
  }
  async getReleaseByLabel(label, params) {
    const releases = await this.getReleases(params);
    return findRefByLabel(releases, label);
  }
  async getTags(params) {
    try {
      const tagsForm = await this.getCachedRepositoryForm("tags", params);
      const url = new URL(tagsForm.action);
      if (this.accessToken) {
        url.searchParams.set("access_token", this.accessToken);
      }
      return await this.fetch(url.toString(), params);
    } catch (e) {
      const repository = await this.getRepository(params);
      return repository.tags;
    }
  }
  async buildQueryURL({
    signal,
    ...params
  } = {}) {
    const ref = params.ref || await this.getResolvedRefString();
    const integrationFieldsRef = params.integrationFieldsRef || (await this.getCachedRepository({ signal })).integrationFieldsRef || void 0;
    return buildQueryURL(this.endpoint, {
      ...this.defaultParams,
      ...params,
      ref,
      integrationFieldsRef,
      routes: params.routes || this.routes,
      accessToken: params.accessToken || this.accessToken
    });
  }
  async resolvePreviewURL(args) {
    var _a, _b;
    let documentID = args.documentID;
    let previewToken = args.previewToken;
    if (typeof globalThis.location !== "undefined") {
      const searchParams = new URLSearchParams(globalThis.location.search);
      documentID = documentID || searchParams.get("documentId");
      previewToken = previewToken || searchParams.get("token");
    } else if (this.refState.httpRequest) {
      if ("query" in this.refState.httpRequest) {
        documentID = documentID || ((_a = this.refState.httpRequest.query) == null ? void 0 : _a.documentId);
        previewToken = previewToken || ((_b = this.refState.httpRequest.query) == null ? void 0 : _b.token);
      } else if ("url" in this.refState.httpRequest && this.refState.httpRequest.url) {
        const searchParams = new URL(this.refState.httpRequest.url).searchParams;
        documentID = documentID || searchParams.get("documentId");
        previewToken = previewToken || searchParams.get("token");
      }
    }
    if (documentID != null && previewToken != null) {
      const document = await this.getByID(documentID, {
        signal: args.signal,
        ref: previewToken,
        lang: "*"
      });
      const url = asLink(document, args.linkResolver);
      if (typeof url === "string") {
        return url;
      }
    }
    return args.defaultURL;
  }
  queryLatestContent() {
    this.refState.mode = "Master" /* Master */;
  }
  queryContentFromReleaseByID(releaseID) {
    this.refState = {
      ...this.refState,
      mode: "ReleaseID" /* ReleaseID */,
      releaseID
    };
  }
  queryContentFromReleaseByLabel(releaseLabel) {
    this.refState = {
      ...this.refState,
      mode: "ReleaseLabel" /* ReleaseLabel */,
      releaseLabel
    };
  }
  queryContentFromRef(ref) {
    this.refState = {
      ...this.refState,
      mode: "Manual" /* Manual */,
      ref
    };
  }
  async graphQLFetch(input, init) {
    const cachedRepository = await this.getCachedRepository();
    const ref = await this.getResolvedRefString();
    const unsanitizedHeaders = {
      "Prismic-ref": ref,
      "Prismic-integration-field-ref": cachedRepository.integrationFieldsRef || "",
      Authorization: this.accessToken ? `Token ${this.accessToken}` : "",
      ...init ? init.headers : {}
    };
    const headers = {};
    for (const key in unsanitizedHeaders) {
      if (unsanitizedHeaders[key]) {
        headers[key.toLowerCase()] = unsanitizedHeaders[key];
      }
    }
    const url = new URL(input);
    url.searchParams.set("ref", ref);
    const query = url.searchParams.get("query");
    if (query) {
      url.searchParams.set("query", minifyGraphQLQuery(query));
    }
    return await this.fetchFn(url.toString(), {
      ...init,
      headers
    });
  }
  async getCachedRepository(params) {
    if (!this.cachedRepository || Date.now() >= this.cachedRepositoryExpiration) {
      this.cachedRepositoryExpiration = Date.now() + REPOSITORY_CACHE_TTL;
      this.cachedRepository = await this.getRepository(params);
    }
    return this.cachedRepository;
  }
  async getCachedRepositoryForm(name, params) {
    const cachedRepository = await this.getCachedRepository(params);
    const form = cachedRepository.forms[name];
    if (!form) {
      throw new PrismicError(`Form with name "${name}" could not be found`, void 0, void 0);
    }
    return form;
  }
  async getResolvedRefString(params) {
    var _a, _b;
    if (this.refState.autoPreviewsEnabled) {
      let previewRef;
      let cookieJar;
      if ((_a = globalThis.document) == null ? void 0 : _a.cookie) {
        cookieJar = globalThis.document.cookie;
      } else if ((_b = this.refState.httpRequest) == null ? void 0 : _b.headers) {
        if ("get" in this.refState.httpRequest.headers && typeof this.refState.httpRequest.headers.get === "function") {
          cookieJar = this.refState.httpRequest.headers.get("cookie");
        } else if ("cookie" in this.refState.httpRequest.headers) {
          cookieJar = this.refState.httpRequest.headers.cookie;
        }
      }
      if (cookieJar) {
        previewRef = getCookie(preview, cookieJar);
      }
      if (previewRef) {
        return previewRef;
      }
    }
    const cachedRepository = await this.getCachedRepository(params);
    const refModeType = this.refState.mode;
    if (refModeType === "ReleaseID" /* ReleaseID */) {
      return findRefByID(cachedRepository.refs, this.refState.releaseID).ref;
    } else if (refModeType === "ReleaseLabel" /* ReleaseLabel */) {
      return findRefByLabel(cachedRepository.refs, this.refState.releaseLabel).ref;
    } else if (refModeType === "Manual" /* Manual */) {
      const res = await castThunk(this.refState.ref)();
      if (typeof res === "string") {
        return res;
      }
    }
    return findMasterRef(cachedRepository.refs).ref;
  }
  async fetch(url, params = {}) {
    const res = await this.fetchFn(url, {
      signal: params.signal
    });
    let json;
    try {
      json = await res.json();
    } catch (e) {
      if (res.status === 404) {
        throw new NotFoundError(`Prismic repository not found. Check that "${this.endpoint}" is pointing to the correct repository.`, url, void 0);
      } else {
        throw new PrismicError(void 0, url, void 0);
      }
    }
    switch (res.status) {
      case 200: {
        return json;
      }
      case 400: {
        throw new ParsingError(json.message, url, json);
      }
      case 401:
      case 403: {
        throw new ForbiddenError("error" in json ? json.error : json.message, url, json);
      }
    }
    throw new PrismicError(void 0, url, json);
  }
}

const getEndpoint = (/* unused pure expression or super */ null && (getRepositoryEndpoint));
const predicates = (/* unused pure expression or super */ null && (predicate));
const Predicates = (/* unused pure expression or super */ null && (predicate));


//# sourceMappingURL=index.js.map


/***/ })

};
;