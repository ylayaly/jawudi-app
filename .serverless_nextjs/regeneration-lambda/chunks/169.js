exports.id = 169;
exports.ids = [169];
exports.modules = {

/***/ 16675:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var _prismicio_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(74776);
/* harmony import */ var _context_appContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68357);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(63627);
/* harmony import */ var _socials__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15324);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);








function Footer({ navigation , settings , page , countSlices  }) {
    const { 0: navClass , 1: setNavClass  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { 0: isSmallContent , 1: setIsSmallContent  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { FooterText , NMLS , contact_link  } = settings.data;
    const { footerMobileLight , showTopFooter  } = page.data;
    const { appStore , playStore  } = settings.data;
    const { inputFocus  } = (0,_context_appContext__WEBPACK_IMPORTED_MODULE_2__/* .useAppContext */ .bp)();
    navigation.sort((a, b)=>{
        if (a.data.order < b.data.order) return -1;
        if (a.data.order > b.data.order) return 1;
        return 0;
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let changing = false;
        let isFocus = false;
        let interval = setInterval(()=>{
            changing = false;
        }, 5000);
        const handleResize = ()=>{
            if (!changing) {
                const el = document.getElementById("content-body");
                changing = true;
                setIsSmallContent(window.innerWidth < 768 && el.clientHeight - 250 < window.innerHeight);
            }
        };
        setTimeout(handleResize, 300);
        const handleScroll = ()=>{
            if (!isFocus) {
                if (document.body.clientWidth > 400) window.scrollY < 60 ? setNavClass(true) : setNavClass(false);
                else if (document.body.clientHeight < window.innerHeight) setNavClass(false);
                else window.scrollY <= 0 ? setNavClass(true) : setNavClass(false);
            }
        };
        document.addEventListener("scroll", handleScroll, {
            passive: true
        });
        window.addEventListener("resize", handleResize, {
            passive: true
        });
        return ()=>{
            document.removeEventListener("scroll", handleScroll);
            window.addEventListener("resize", handleResize);
            clearInterval(interval);
        };
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("footer", {
                className: "footer max-w-max mx-auto lg:bg-white " + (navClass && !inputFocus && !footerMobileLight ? "fixed xs:relative" : "relative"),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "absolute inset-0 w-full h-full " + (showTopFooter ? "bg-footer" : "bg-footer-2")
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "relative w-full h-full px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 hidden md:block " + (showTopFooter && "pt-16 lg:pt-24 xl:pt-32 2xl:pt-48"),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "footer__container 3xl:container mx-auto grid lg:grid-cols-4 pt-8 lg:pt-16 pb-2 md:pb-4 lg:pb-16 gap-x-8",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "lg:col-span-3",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "grid grid-cols-3 xl:flex xl:flex-nowrap gap-4 lg:gap-12 xl:gap-24 2xl:gap-40",
                                            children: navigation.map((nav, kNav)=>{
                                                const { TitleSection , Links  } = nav.data;
                                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            className: "text-white font-semibold font-lato text-xs lg:text-sm uppercase tracking-xl",
                                                            children: TitleSection
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "flex flex-col gap-3 xl:gap-5 mt-8 xl:mt-11",
                                                            children: Links.map((l, key)=>{
                                                                return l.Link && l.Link.link_type !== "Any" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_prismicio_react__WEBPACK_IMPORTED_MODULE_6__/* .PrismicLink */ .wK, {
                                                                    field: l.Link,
                                                                    className: "text-left",
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: "text-white text-xs lg:text-sm text-semibold",
                                                                        style: {
                                                                            color: l.textColor ? l.textColor : "white"
                                                                        },
                                                                        children: l.LinkText
                                                                    }, "link-" + key)
                                                                }, "prismicLink-" + key) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: "text-white text-xs lg:text-sm text-semibold cursor-pointer",
                                                                    style: {
                                                                        color: l.textColor ? l.textColor : "white"
                                                                    },
                                                                    children: l.LinkText
                                                                }, "_" + key);
                                                            })
                                                        })
                                                    ]
                                                }, "nav-" + kNav);
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "footer__text-made hidden lg:block pt-24 xl:pt-32 2xl:pt-64 3xl:pt-80 text-white tracking-xl font-bold uppercase text-[10px] xl:text-xs",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_prismicio_react__WEBPACK_IMPORTED_MODULE_6__/* .PrismicRichText */ .v, {
                                                field: FooterText
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "lg:col-span-1",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex flex-col justify-between h-full text-jw-green-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "grid grid-cols-3 gap-4 lg:gap-20 2xl:gap-40 lg:block mb-8 lg:mb-0",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_socials__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                                        settings: settings,
                                                        className: "lg:justify-end mt-6 lg:mt-0 xl:gap-6"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {}),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "lg:text-right mt-8",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_prismicio_react__WEBPACK_IMPORTED_MODULE_6__/* .PrismicLink */ .wK, {
                                                            field: contact_link,
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: "font-lato font-bold px-4 py-3 text-jw-green-1 border border-jw-green-1 rounded-xl text-xs tracking-2lg",
                                                                children: "CONTACT US"
                                                            })
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex justify-between lg:justify-end items-end md:pt-10 lg:pt-32 2xl:pt-48",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "footer__text-made block lg:hidden text-white tracking-xl font-bold uppercase text-[10px] xl:text-xs",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_prismicio_react__WEBPACK_IMPORTED_MODULE_6__/* .PrismicRichText */ .v, {
                                                            field: FooterText
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "font-lato text-[10px] xl:text-xs tracking-xl",
                                                        children: NMLS
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "block md:hidden bg-footer-bottom " + (navClass && !inputFocus ? "pt-12 xs:pt-0" : ""),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "footer__store flex justify-center gap-4 text-white px-16 pt-6 " + (navClass && !inputFocus && !footerMobileLight ? "block xs:hidden" : "hidden"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_prismicio_react__WEBPACK_IMPORTED_MODULE_6__/* .PrismicLink */ .wK, {
                                        field: appStore,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                            icon: "apple"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_prismicio_react__WEBPACK_IMPORTED_MODULE_6__/* .PrismicLink */ .wK, {
                                        field: playStore,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                            icon: "android"
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "footer__policies flex justify-between items-end text-xxs xs:text-9 bg-jw-dark-blue " + (navClass && !inputFocus && !footerMobileLight ? " py-4 px-6 mt-10 xs:mt-0 " : " py-4 px-6"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "font-lato tracking-xl text-jw-green-1",
                                        children: NMLS
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "footer__text-made text-white tracking-xl font-bold uppercase",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_prismicio_react__WEBPACK_IMPORTED_MODULE_6__/* .PrismicRichText */ .v, {
                                            field: FooterText
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            isSmallContent && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "h-[30vh] w-full bg-jw-dark-blue"
            })
        ]
    });
};


/***/ }),

/***/ 35311:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Header)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(85893);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@prismicio/react/dist/index.js
var dist = __webpack_require__(74776);
// EXTERNAL MODULE: ./node_modules/@prismicio/helpers/dist/index.js + 1 modules
var helpers_dist = __webpack_require__(46486);
// EXTERNAL MODULE: ./node_modules/next/router.js
var next_router = __webpack_require__(11163);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(25675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./context/appContext.js
var appContext = __webpack_require__(68357);
;// CONCATENATED MODULE: ./components/icons/logo.js


function LogoDark() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        width: "100%",
        height: "100%",
        viewBox: "0 0 189 41",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("defs", {
                children: /*#__PURE__*/ jsx_runtime.jsx("pattern", {
                    id: "pattern",
                    preserveAspectRatio: "none",
                    width: "100%",
                    height: "100%",
                    viewBox: "0 0 987 214",
                    children: /*#__PURE__*/ jsx_runtime.jsx("image", {
                        width: "987",
                        height: "214",
                        xlinkHref: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA9sAAADWCAYAAAG2+KEJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmVkYTJiM2ZhYywgMjAyMS8xMS8xNy0xNzoyMzoxOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjEgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkQwMDFFOUM3OUE3MTFFQ0EyMjRGQzA0RkNCRjM0N0QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDAzREY5QTI3OUU3MTFFQ0EyMjRGQzA0RkNCRjM0N0QiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2RDAwMUU5QTc5QTcxMUVDQTIyNEZDMDRGQ0JGMzQ3RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2RDAwMUU5Qjc5QTcxMUVDQTIyNEZDMDRGQ0JGMzQ3RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvfcUJ0AAE0uSURBVHja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"
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx("rect", {
                id: "logo-blue",
                width: "189",
                height: "41",
                fill: "url(#pattern)"
            })
        ]
    });
};

;// CONCATENATED MODULE: ./components/icons/iconLogoLight.js


function IconLogoLight() {
    return /*#__PURE__*/ _jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink",
        width: "51",
        height: "48",
        viewBox: "0 0 51 48",
        children: [
            /*#__PURE__*/ _jsx("defs", {
                children: /*#__PURE__*/ _jsx("pattern", {
                    id: "pattern",
                    preserveAspectRatio: "none",
                    width: "100%",
                    height: "100%",
                    viewBox: "0 0 253 236",
                    children: /*#__PURE__*/ _jsx("image", {
                        width: "253",
                        height: "236",
                        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP0AAADsCAYAAAHIuJBUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDY0OCwgMjAyMS8wMS8xMi0xNTo1MjoyOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjIgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEI1RDUzMkM2OTZGMTFFQjk2N0FGODQ2NEVDRURGQTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEI1RDUzMkQ2OTZGMTFFQjk2N0FGODQ2NEVDRURGQTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowQjVENTMyQTY5NkYxMUVCOTY3QUY4NDY0RUNFREZBMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowQjVENTMyQjY5NkYxMUVCOTY3QUY4NDY0RUNFREZBMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhjjKRYAABNnSURBVHjaYmx8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"
                    })
                })
            }),
            /*#__PURE__*/ _jsx("rect", {
                id: "bull-1",
                width: "51",
                height: "48",
                fill: "url(#pattern)"
            })
        ]
    });
};

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(41664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./components/socials.js
var socials = __webpack_require__(15324);
// EXTERNAL MODULE: ./components/icon.js + 29 modules
var icon = __webpack_require__(63627);
;// CONCATENATED MODULE: ./components/icons/logoLight.js


function LogoLight() {
    return /*#__PURE__*/ _jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink",
        width: "100%",
        height: "100%",
        viewBox: "0 0 181 43",
        children: [
            /*#__PURE__*/ _jsx("defs", {
                children: /*#__PURE__*/ _jsx("pattern", {
                    id: "pattern",
                    preserveAspectRatio: "none",
                    width: "100%",
                    height: "100%",
                    viewBox: "0 0 512 123",
                    children: /*#__PURE__*/ _jsx("image", {
                        width: "512",
                        height: "123",
                        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAB7CAYAAAF1BQhHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmVkYTJiM2ZhYywgMjAyMS8xMS8xNy0xNzoyMzoxOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjEgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTA2MDlBQkY3QkI5MTFFQ0JBNUJCNUUwNkZDMEM0RDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTA2MDlBQzA3QkI5MTFFQ0JBNUJCNUUwNkZDMEM0RDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMkJDRkFBRTdCQjExMUVDQkE1QkI1RTA2RkMwQzREOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMDYwOUFCRTdCQjkxMUVDQkE1QkI1RTA2RkMwQzREOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmEzlYoAACZBSURBVHja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"
                    })
                })
            }),
            /*#__PURE__*/ _jsx("rect", {
                id: "white-logo",
                width: "181",
                height: "43",
                fill: "url(#pattern)"
            })
        ]
    });
};

// EXTERNAL MODULE: ./assets/img/logo.svg
var logo = __webpack_require__(38286);
;// CONCATENATED MODULE: ./components/header.js














function Header({ navigation , settings , page  }) {
    const { minimalHeader , logoColor , logoMobileColor , headerMobileWhite , showStoreBtn  } = page.data;
    const { QRcode , textQRCode , text_call_to_action_qr  } = settings.data;
    const { 0: navClass , 1: setNavClass  } = (0,react.useState)(false);
    const { 0: open , 1: setOpen  } = (0,react.useState)(false);
    const { 0: close , 1: setClose  } = (0,react.useState)(false);
    const { 0: isMobile , 1: setIsMobile  } = (0,react.useState)(false);
    const { showCallQR , changeCallQR , openedLegal  } = (0,appContext/* useAppContext */.bp)();
    const { 0: showQR , 1: setShowQR  } = (0,react.useState)(false);
    const links = navigation.data.slices.filter((l)=>l.primary.type !== "Desktop"
    );
    const desktopLinks = navigation.data.slices.filter((l)=>l.primary.type !== "Mobile"
    );
    const src = helpers_dist/* asImageSrc */.D2(QRcode);
    const router = (0,next_router.useRouter)();
    var current = router.asPath.replace(/\//g, "");
    current = current === "" ? "home" : current;
    desktopLinks.map((l)=>{
        l.open = false;
        return l;
    });
    function closeMenu() {
        setOpen(false);
        setClose(true);
        setTimeout(function() {
            setClose(false);
        }, 800);
    }
    (0,react.useEffect)(()=>{
        function legalClick() {
            document.querySelectorAll("[data-href]").forEach((btn)=>{
                btn.addEventListener("click", (e)=>{
                    e.preventDefault();
                    if (e && e.target && e.target.closest("a")) {
                        openedLegal(e.target.closest("a").dataset.href);
                    }
                    return false;
                }, true);
            });
        }
        setIsMobile(document.body.clientWidth < 768);
        const handleScroll = ()=>{
            if (document.body.clientWidth > 400) window.scrollY > 30 ? setNavClass(true) : setNavClass(false);
            else if (document.body.clientHeight < window.innerHeight) setNavClass(true);
            else window.scrollY > 5 ? setNavClass(true) : setNavClass(false);
        };
        const handleResize = ()=>{
            setIsMobile(document.body.clientWidth < 768);
        };
        document.addEventListener("scroll", handleScroll, {
            passive: true
        });
        window.addEventListener("resize", handleResize, true);
        setTimeout(legalClick, 120);
        return ()=>{
            document.removeEventListener("scroll", handleScroll);
            window.addEventListener("resize", handleResize);
        };
    }, []);
    (0,react.useEffect)(()=>{
        const viewQRReady = window.localStorage.getItem("viewQRReady");
        if (showStoreBtn && viewQRReady === null) {
            setTimeout(()=>{
                setShowQR(true);
                setTimeout(()=>{
                    setShowQR(false);
                    window.localStorage.setItem("viewQRReady", true);
                }, 3000);
            }, 1000);
        }
    }, [
        showStoreBtn
    ]);
    const headerMobileWhiteClass = headerMobileWhite ? " relative md:absolute pb-8" : " absolute";
    const bgHeader = headerMobileWhite ? "bg-white " : "bg-jw-turquoise-1 md:bg-white ";
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("header", {
                className: "max-w-max mx-auto top-0 right-0 left-0 h-auto px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 " + (navClass ? !minimalHeader ? "fixed bg-white " : "fixed " : (minimalHeader ? "bg-transparent" : "bg-white xl:pb-14") + headerMobileWhiteClass + " pt-8 xs:pt-10 xxl:pt-20"),
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: bgHeader + " absolute h-full right-0 top-0 w-full transition-opacity ease-in-out duration-1000 " + (navClass && minimalHeader ? "opacity-100 md:opacity-70" : "opacity-0")
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "3xl:container relative mx-auto flex justify-between items-stretch",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                className: "py-4",
                                children: navClass ? /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "/",
                                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("a", {
                                        className: "block h-6 md:w-8 md:h-8",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx(icon/* default */.Z, {
                                                icon: "icon-blue",
                                                className: "text-jw-blue-1 hidden md:block"
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                className: "block h-6 w-28 md:hidden",
                                                children: /*#__PURE__*/ jsx_runtime.jsx(LogoDark, {})
                                            })
                                        ]
                                    })
                                }) : /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "/",
                                    children: /*#__PURE__*/ jsx_runtime.jsx("a", {
                                        className: "flex items-center h-6 lg:h-10 3xl:h-12 w-28 md:w-32 lg:w-36 xl:w-40 3xl:w-44",
                                        children: isMobile ? /*#__PURE__*/ jsx_runtime.jsx(icon/* default */.Z, {
                                            icon: "logo-jawudi",
                                            className: logoMobileColor === "Dark" || logoMobileColor === "Light" && headerMobileWhite ? "text-jw-dark-blue" : logoMobileColor === "Light" ? "text-white" : "text-jw-green-1"
                                        }) : /*#__PURE__*/ jsx_runtime.jsx(icon/* default */.Z, {
                                            icon: "logo-jawudi",
                                            className: logoColor === "Dark" || logoColor === "Light" && headerMobileWhite && isMobile ? "text-jw-dark-blue" : logoColor === "Light" ? "text-white" : "text-jw-green-1"
                                        })
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                className: "hidden md:flex header-navigation gap-6 xxl:gap-12 2xl:gap-16 " + (navClass || !minimalHeader ? "text-jw-dark-blue" : "text-white"),
                                children: desktopLinks.map((l, i)=>{
                                    if (l.items.length > 0 && l.items[0].link_text) {
                                        return /*#__PURE__*/ jsx_runtime.jsx(ListNavBar, {
                                            data: l.primary,
                                            current: current,
                                            items: l.items,
                                            i: i,
                                            btnClass: "uppercase font-lato font-bold text-xs lg:text-sm tracking-lg xl:tracking-widest 2xl:tracking-xl",
                                            itemClass: "font-lato font-bold text-xs lg:text-sm",
                                            navClass: navClass,
                                            closeMenu: closeMenu
                                        }, "p-link-" + i);
                                    } else {
                                        return /*#__PURE__*/ jsx_runtime.jsx("div", {
                                            className: "relative md:flex items-center",
                                            children: l.primary.link && l.primary.link.link_type !== "Any" ? /*#__PURE__*/ jsx_runtime.jsx(dist/* PrismicLink */.wK, {
                                                field: l.primary.link,
                                                children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                    className: "uppercase font-lato font-bold text-xs lg:text-sm tracking-lg xl:tracking-widest 2xl:tracking-xl " + (l.primary.link.uid === current ? "active" : ""),
                                                    children: l.primary.link_text
                                                }, "link-" + i)
                                            }, "p-link-" + i) : /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                className: "uppercase font-lato font-bold text-xs lg:text-sm tracking-lg xl:tracking-widest 2xl:tracking-xl ",
                                                children: l.primary.link_text
                                            }, "no-link-" + i)
                                        }, "d-link-" + i);
                                    }
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                className: "logo-blue flex md:hidden",
                                children: /*#__PURE__*/ jsx_runtime.jsx("button", {
                                    type: "button",
                                    onClick: ()=>setOpen(true)
                                    ,
                                    children: /*#__PURE__*/ jsx_runtime.jsx(icon/* default */.Z, {
                                        icon: "icon-blue",
                                        className: logoMobileColor === "Light" && !navClass && !headerMobileWhite ? "text-jw-green-2" : "text-jw-blue-1"
                                    })
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        id: "header-nav",
                        className: "md:hidden transition-opacity fixed inset-0 " + (open ? "bg-white  min-h-screen overflow-scroll" : close ? "close" : "hidden"),
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            id: "nav-links",
                            className: "relative h-auto ",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: "bg-header-mobile pb-40",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                                            className: "absolute right-0 top-0 pt-20 px-9 md:px-12 z-10",
                                            children: /*#__PURE__*/ jsx_runtime.jsx("button", {
                                                className: "w-5 h-5",
                                                type: "button",
                                                onClick: ()=>{
                                                    closeMenu();
                                                },
                                                children: /*#__PURE__*/ jsx_runtime.jsx(icon/* default */.Z, {
                                                    icon: "close"
                                                })
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                                            className: "pt-20 px-9 md:px-12 relative text-jw-green-4 font-lato tracking-xl font-medium uppercase flex flex-col gap-8 ",
                                            children: links.map((link, i)=>{
                                                if (link.items.length > 0 && link.items[0].link_text) {
                                                    return /*#__PURE__*/ jsx_runtime.jsx(ListNavBar, {
                                                        data: link.primary,
                                                        current: current,
                                                        items: link.items,
                                                        i: i,
                                                        itemClass: "w-full block capitalize text-xs tracking-normal ml-12",
                                                        btnClass: "w-full block uppercase tracking-xl text-left",
                                                        navClass: navClass,
                                                        closeMenu: closeMenu
                                                    }, i);
                                                } else {
                                                    return link.primary.link && link.primary.link.link_type !== "Any" ? /*#__PURE__*/ jsx_runtime.jsx(dist/* PrismicLink */.wK, {
                                                        field: link.primary.link,
                                                        children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                            onClick: ()=>{
                                                                closeMenu();
                                                            },
                                                            className: "w-full block text-left tracking-xl",
                                                            children: link.primary.link_text
                                                        }, "nav-link-" + i)
                                                    }, "nav-p-link-" + i) : /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                        onClick: ()=>{
                                                            closeMenu();
                                                        },
                                                        className: "w-full block text-left tracking-xl",
                                                        children: link.primary.link_text
                                                    }, "nav-no-link-" + i);
                                                }
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                                            className: "relative px-9 md:px-12 mt-18 text-jw-green-1",
                                            children: /*#__PURE__*/ jsx_runtime.jsx(socials/* default */.Z, {
                                                settings: settings,
                                                className: "xl:gap-6"
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("div", {
                                    className: "left-0 right-0 bottom-0 px-9 md:px-12 pb-28",
                                    children: /*#__PURE__*/ jsx_runtime.jsx("div", {
                                        className: "w-28 md:w-48",
                                        children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                            href: "/",
                                            children: /*#__PURE__*/ jsx_runtime.jsx("a", {
                                                children: /*#__PURE__*/ jsx_runtime.jsx(LogoDark, {})
                                            })
                                        })
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {})
                ]
            }),
            showStoreBtn && QRcode && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: `absolute hidden md:flex top-26 lg:top-32 xxl:top-40 2xl:top-52 right-0 overflow-hidden items-center gap-4`,
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("label", {
                        onClick: ()=>{
                            setShowQR(!showQR);
                            changeCallQR(false);
                        },
                        className: `relative z-10 cursor-pointer transition-all translate-x-[87%] lg:translate-x-[82%] xl:translate-x-[70%] xxl:translate-x-[85%] mr-8 2xl:mr-12 text-white/50 text-lg xxl:text-2xl font-neutrafaceText animate-pulseTextQR font-book ${showCallQR && !showQR ? "opacity-100" : "opacity-0"}`,
                        children: text_call_to_action_qr
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        onClick: ()=>{
                            setShowQR(!showQR);
                            changeCallQR(false);
                        },
                        className: `flex items-center transition-all duration-1000 z-10 cursor-pointer gap-2 2xl:gap-4 ${showQR ? "translate-x-0" : "translate-x-[87%] lg:translate-x-[82%] xxl:translate-x-[85%]"}`,
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                className: `btn btn__more btn_qr block transition-all duration-1000  ${showQR ? "rotate-90" : "-rotate-90"}`
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                className: "bg-white rounded-l-lg lg:rounded-l-xxl hidden md:block",
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: "gap-4 xxl:gap-8 items-center p-2 lg:p-4 flex",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                                            className: "h-auto rounded-lg max-w-20 2xl:max-w-24 3xl:max-w-33",
                                            children: /*#__PURE__*/ jsx_runtime.jsx("img", {
                                                src: src,
                                                alt: QRcode.alt
                                            })
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                            className: "max-w-20 xxl:max-w-26",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                    className: "font-semibold text-9 xxl:text-xs leading-tight text-center font-lato text-jw-dark-blue uppercase block w-full mb-3",
                                                    children: textQRCode
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx((image_default()), {
                                                    src: logo/* default.src */.Z.src,
                                                    width: logo/* default.width */.Z.width,
                                                    height: logo/* default.height */.Z.height,
                                                    alt: ""
                                                })
                                            ]
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
const ListNavBar = (data)=>{
    const d = data.data;
    const it = data.items;
    const { 0: open , 1: setOpen  } = (0,react.useState)(false);
    function close() {
        setTimeout(()=>{
            setOpen(false);
            data.closeMenu();
        }, 120);
    }
    function show(ev) {
        setOpen(!open);
        ev.target.focus();
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "relative md:flex",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("button", {
                className: data.btnClass,
                onClick: (ev)=>show(ev)
                ,
                onBlur: ()=>close()
                ,
                children: d.link_text
            }, "no-link-" + data.i),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: `w-full md:w-40 md:absolute flex flex-col gap-5 transition-all duration-700 overflow-hidden h-auto md:-left-4 md:px-4 top-full ${open ? "max-h-[10rem] md:py-4 mt-5 md:mt-[2px]" : "max-h-0"} ${!data.navClass && "top-[70%]"} ${open && data.navClass && "md:bg-white/70 "}`,
                children: it.map((item, j)=>{
                    return item.link && item.link.link_type !== "Any" ? /*#__PURE__*/ jsx_runtime.jsx(dist/* PrismicLink */.wK, {
                        field: item.link,
                        children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                            className: data.itemClass + (item.link.uid === data.current ? " active" : ""),
                            children: item.link_text
                        }, "link-" + data.i)
                    }, "p-link-" + j) : /*#__PURE__*/ jsx_runtime.jsx("span", {
                        className: data.itemClass,
                        children: item.link_text
                    }, "no-link-" + data.i);
                })
            })
        ]
    }, data.i);
};


/***/ }),

/***/ 44298:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9008);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);



const Seo = ({ data  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                children: `${data.title} | Jawudi`
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "description",
                content: data.description
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:title",
                content: data.title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:image",
                content: data.image
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:description",
                content: data.description
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:title",
                content: data.title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:description",
                content: data.description
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:image",
                content: data.image
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "icon",
                type: "image/png",
                sizes: "32x32",
                href: "favicon.png"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                href: "https://use.typekit.net/pjo6tun.css",
                rel: "stylesheet",
                type: "text/css"
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Seo);


/***/ }),

/***/ 15324:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Socials)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var _prismicio_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(74776);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(63627);





function Socials({ settings , className =""  }) {
    const socials = settings.data.SocialNetwork;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "flex gap-3 " + className,
        children: socials.map((social, key)=>{
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_prismicio_react__WEBPACK_IMPORTED_MODULE_3__/* .PrismicLink */ .wK, {
                field: social.link,
                className: "flex justify-center w-8 lg:w-12 h-8 lg:h-12 items-center rounded-lg p-2 lg:p-3 lg:rounded-2xl shadow-lg shadow-black/50",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    icon: social.type
                })
            }, key);
        })
    });
};


/***/ }),

/***/ 9008:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(83121)


/***/ })

};
;