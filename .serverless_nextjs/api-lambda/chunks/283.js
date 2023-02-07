"use strict";
exports.id = 283;
exports.ids = [283];
exports.modules = {

/***/ 53283:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ page)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(85893);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@prismicio/helpers/dist/index.js + 1 modules
var dist = __webpack_require__(46486);
// EXTERNAL MODULE: ./node_modules/@prismicio/react/dist/index.js
var react_dist = __webpack_require__(74776);
// EXTERNAL MODULE: ./slices/index.js + 40 modules
var slices = __webpack_require__(10166);
// EXTERNAL MODULE: ./components/header.js + 3 modules
var header = __webpack_require__(35311);
// EXTERNAL MODULE: ./components/footer.js
var footer = __webpack_require__(16675);
// EXTERNAL MODULE: ./components/seo.js
var seo = __webpack_require__(44298);
// EXTERNAL MODULE: ./context/appContext.js
var appContext = __webpack_require__(68357);
;// CONCATENATED MODULE: ./components/detailFund.js





const DetailFundComponent = ()=>{
    const { detailFund , changeDetailFund , goals  } = (0,appContext/* useAppContext */.bp)();
    const { 0: next , 1: setNext  } = (0,react.useState)(null);
    const { 0: prev , 1: setPrev  } = (0,react.useState)(null);
    const { 0: closing , 1: setClosing  } = (0,react.useState)(false);
    function close() {
        setClosing(true);
        setTimeout(()=>{
            setClosing(false);
            changeDetailFund(null);
            setNext(null);
        }, 950);
    }
    function changeGoal(goal) {
        const c = document.getElementById("current-goal");
        const n = document.getElementById("next-goal");
        c.classList.add("opacity-0");
        document.getElementById("current-goal-actions").classList.add("opacity-0");
        document.getElementById("next-goal-actions").classList.add("opacity-0");
        setTimeout(()=>{
            n.classList.remove("opacity-70");
            n.classList.remove("lg:translate-x-32");
            n.classList.remove("xxl:translate-x-48");
            n.classList.remove("2xl:translate-x-56");
        }, 480);
        setTimeout(()=>{
            changeDetailFund(goal);
            c.classList.remove("opacity-0");
        }, 960);
        setTimeout(()=>{
            n.classList.add("opacity-70");
            n.classList.add("lg:translate-x-32");
            n.classList.add("xxl:translate-x-48");
            n.classList.add("2xl:translate-x-56");
            document.getElementById("current-goal-actions").classList.remove("opacity-0");
            document.getElementById("next-goal-actions").classList.remove("opacity-0");
        }, 1440);
    }
    (0,react.useEffect)(()=>{
        setTimeout(()=>{
            setGoals();
        }, 500);
    }, [
        detailFund
    ]);
    function setGoals() {
        if (detailFund) {
            const current = goals.findIndex((g)=>g.id == detailFund.id
            );
            if (goals.length > current + 1) {
                setNext(goals[current + 1]);
            } else if (current !== 0) {
                setNext(goals[0]);
            } else {
                setNext(null);
            }
            if (current == 0 && goals.length > 1) {
                setPrev(goals[goals.length - 1]);
            } else if (current > 0 && goals.length > 1) {
                setPrev(goals[current - 1]);
            } else {
                setPrev(null);
            }
        }
    }
    if (!detailFund) return /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {});
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        id: "detail-fund",
        className: `detail-fund fixed overflow-auto inset-0 w-full h-full z-form text-white animate-show ${closing ? "animate-hide" : ""}`,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "fixed bg-black/70 inset-0",
                onClick: close
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: `flex justify-center my-20 relative`,
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "absolute inset-0 cursor-pointer",
                        onClick: close
                    }),
                    next && /*#__PURE__*/ jsx_runtime.jsx(DetailGoal, {
                        id: "next-goal",
                        data: next.data,
                        className: "absolute z-10 opacity-70 translate-x-0 lg:translate-x-32 xxl:translate-x-48 2xl:translate-x-56 max-h-full h-full overflow-hidden transition-all duration-500 cursor-pointer animate-showNext",
                        close: ()=>close()
                        ,
                        next: next,
                        prev: prev,
                        changeGoal: (g)=>changeGoal(g)
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(DetailGoal, {
                        id: "current-goal",
                        data: detailFund.data,
                        className: "relative z-20 transition-all duration-500",
                        close: ()=>close()
                        ,
                        next: next,
                        prev: prev,
                        changeGoal: (g)=>changeGoal(g)
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const detailFund = (DetailFundComponent);
const DetailGoal = (data)=>{
    const { title , image , description , items  } = data.data;
    const { next , prev , className , close , changeGoal , id  } = data;
    const goNext = (_)=>{
        if (id == "next-goal") {
            changeGoal(next);
        }
    };
    const hasImage = items.filter((it)=>it.image && it.image.url
    ).length;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        id: id,
        onClick: goNext,
        className: `${className} rounded-4xl border border-white w-11/12 md:w-3/4 xxl:w-3/5 bg-jw-dark-blue`,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "absolute -right-[2px] -top-[2px] z-30",
                children: /*#__PURE__*/ jsx_runtime.jsx("button", {
                    className: "close w-11 h-11 lg:w-24 lg:h-24 xxl:w-32 xxl:h-32",
                    onClick: close
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "relative z-20",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("svg", {
                        width: 0,
                        height: 0,
                        children: /*#__PURE__*/ jsx_runtime.jsx("clipPath", {
                            id: "trazado",
                            clipPathUnits: "objectBoundingBox",
                            children: /*#__PURE__*/ jsx_runtime.jsx("path", {
                                d: "M621.554-418.7a.161.161,0,0,0-.1-.077.181.181,0,0,0-.082,0,1.5,1.5,0,0,0-.144.053.683.683,0,0,1-.316.024.98.98,0,0,1-.278-.077c-.023-.01-.078-.026-.08-.035s0-.881,0-.881h1Z",
                                transform: "translate(-620.554 419.688)",
                                fill: "#4df299"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("img", {
                        style: {
                            "clipPath": "url(#trazado)"
                        },
                        className: "object-cover bg-center w-full h-full rounded-t-4xl",
                        src: dist/* asImageSrc */.D2(image),
                        alt: "",
                        width: image === null || image === void 0 ? void 0 : image.dimensions.width,
                        height: image === null || image === void 0 ? void 0 : image.dimensions.height
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "absolute inset-0 w-full h-full overflow-hidden flex md:hidden justify-center items-center",
                        children: /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "border border-jw-green-1 text-jw-green-1 text-2xl lg:text-3xl xxl:text-11 p-5 bg-jw-dark-blue/50",
                            children: /*#__PURE__*/ jsx_runtime.jsx("h3", {
                                className: "mb-0 uppercase font-neutrafaceText font-book",
                                children: title
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "relative p-8 md:p-12 xl:p-18 2xl:p-26 pb-12 2xl:pb-16 richtext__jw",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "absolute -top-60 right-12 lg:right-20 overflow-hidden hidden md:block",
                        children: /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "border border-jw-green-1 text-jw-green-1 text-11 p-2 xl:p-6 pt-60 xl:pt-56",
                            children: /*#__PURE__*/ jsx_runtime.jsx("h3", {
                                className: "mb-0 uppercase font-neutrafaceText font-book",
                                children: title
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "font-neutrafaceText font-book text-center md:text-left",
                        children: /*#__PURE__*/ jsx_runtime.jsx(react_dist/* PrismicRichText */.v, {
                            field: description
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 xxl:gap-24 2xl:gap-32 mt-5 md:mt-8 lg:mt-12 2xl:mt-20",
                        children: items.map((item, key)=>{
                            return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "mx-auto flex flex-col gap-8 md:gap-10 lg:gap-12 2xl:gap-20 h-full",
                                children: [
                                    item.image && item.image.url && /*#__PURE__*/ jsx_runtime.jsx("div", {
                                        className: `max-h-32 h-auto md:h-32`,
                                        children: /*#__PURE__*/ jsx_runtime.jsx("img", {
                                            className: "object-contain bg-center w-full h-full",
                                            src: dist/* asImageSrc */.D2(item.image),
                                            alt: "",
                                            width: item.image.dimensions.width,
                                            height: item.image.dimensions.height
                                        })
                                    }),
                                    (item && item.value || item.valueDetail) && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: `flex flex-col justify-center items-center w-full ${hasImage ? "h-auto md:min-h-32" : "min-h-14"}`,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                className: "font-medium text-6xl md:text-4xl xl:text-6xl font-neutrafaceDisplay",
                                                children: item.value
                                            }),
                                            item.valueDetail && /*#__PURE__*/ jsx_runtime.jsx("p", {
                                                children: item.valueDetail
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                                        className: "font-aeonik font-medium text-center md:text-left",
                                        children: /*#__PURE__*/ jsx_runtime.jsx(react_dist/* PrismicRichText */.v, {
                                            field: item.information
                                        })
                                    })
                                ]
                            }, "fund-detail-" + key);
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        id: id + "-actions",
                        className: "flex justify-center items-center gap-3 md:gap-6 uppercase text-jw-green-1 font-neutrafaceDisplayTitling mt-10 md:mt-14 xl:mt-16 2xl:mt-20 transition-all duration-500 text-xs lg:text-base",
                        children: [
                            prev && prev.data && prev.data.title && /*#__PURE__*/ jsx_runtime.jsx("button", {
                                onClick: ()=>changeGoal(prev)
                                ,
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                    className: "md:tracking-xl",
                                    children: [
                                        "<",
                                        " ",
                                        prev.data.title
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                className: "w-[5px] h-[5px] bg-jw-green-1 rounded-full"
                            }),
                            next && next.data && next.data.title && /*#__PURE__*/ jsx_runtime.jsx("button", {
                                onClick: ()=>changeGoal(next)
                                ,
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                    className: "md:tracking-xl",
                                    children: [
                                        next.data.title,
                                        " ",
                                        ">"
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

// EXTERNAL MODULE: ./components/icon.js + 29 modules
var icon = __webpack_require__(63627);
;// CONCATENATED MODULE: ./components/legalPage.js






const LegalPage = ()=>{
    const { 0: activePage , 1: setActivePage  } = (0,react.useState)(null);
    const { 0: nextPage , 1: setNextPage  } = (0,react.useState)(null);
    const { 0: loading , 1: setLoading  } = (0,react.useState)(false);
    const { 0: closing , 1: setClosing  } = (0,react.useState)(false);
    const { openedLegal , openLegal , legaPages  } = (0,appContext/* useAppContext */.bp)();
    const close = ()=>{
        setClosing(true);
        setTimeout(()=>{
            setActivePage(null);
            openedLegal(null);
            setClosing(false);
        }, 800);
    };
    const goToPage = (page)=>{
        setLoading(true);
        setActivePage(page);
        setNextPage(getNext(page));
        document.querySelector("#legal-page").scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setTimeout(()=>{
            setLoading(false);
        }, 300);
    };
    const getNext = (page = null)=>{
        const uid = page ? page.uid : activePage === null || activePage === void 0 ? void 0 : activePage.uid;
        const current = legaPages.findIndex((p)=>{
            return p.uid == uid;
        });
        let next = null;
        if (current + 1 == legaPages.length) {
            next = legaPages[0];
        } else if (current != -1) {
            next = legaPages[current + 1];
        }
        return next;
    };
    const handleSubmit = async (event)=>{
        if (legaPages) {
            const current = legaPages.find((p)=>p.uid == openLegal
            );
            setActivePage(current);
            setNextPage(getNext(current));
        }
    };
    (0,react.useEffect)(()=>{
        handleSubmit();
    }, [
        openLegal
    ]);
    return activePage ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
        id: "legal-page",
        className: `legal-page fixed inset-0 w-full h-full z-form overflow-auto animate-show ${closing && "animate-hide"}`,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "fixed inset-0 bg-jw-dark-blue/90 cursor-pointer",
                onClick: close
            }),
            /*#__PURE__*/ jsx_runtime.jsx("svg", {
                width: 0,
                height: 0,
                children: /*#__PURE__*/ jsx_runtime.jsx("clipPath", {
                    id: "trazado",
                    clipPathUnits: "objectBoundingBox",
                    children: /*#__PURE__*/ jsx_runtime.jsx("path", {
                        id: "Trazado_191",
                        "data-name": "Trazado 191",
                        d: "M-2421.726-1101.151c.056,0,.166-.131.257-.23a.256.256,0,0,1,.394-.05c.156.116.191.115.24-.03.025-.073.1-.386.108-.4v-.293h-1S-2421.728-1101.151-2421.726-1101.151Z",
                        transform: "translate(2421.727 1102.151)",
                        fill: "#fff"
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx("svg", {
                width: 0,
                height: 0,
                children: /*#__PURE__*/ jsx_runtime.jsx("clipPath", {
                    id: "trazado_m",
                    clipPathUnits: "objectBoundingBox",
                    children: /*#__PURE__*/ jsx_runtime.jsx("path", {
                        id: "Trazado_194",
                        "data-name": "Trazado 194",
                        d: "M-2465.266-1138.313c.058.063.154-.049.272-.129a.367.367,0,0,1,.407-.033c.161.075.2.075.248-.019a1.591,1.591,0,0,0,.07-.162v-.638h-1S-2465.272-1138.32-2465.266-1138.313Z",
                        transform: "translate(2465.269 1139.294)",
                        fill: "#fff"
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "flex justify-center w-full py-40",
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "relative rounded-3xl bg-white w-10/12 text-jw-dark-blue",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "absolute right-0 lg:-top-[1px] z-30",
                            children: /*#__PURE__*/ jsx_runtime.jsx("button", {
                                className: "close w-11 h-11 lg:w-16 lg:h-16",
                                onClick: close
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "bg_hero relative bg-gradient-to-r from-jw-turquoise-6 to-jw-turquoise-5 rounded-t-3xl pb-12 sm:pb-24 2xl:pb-32",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "px-6 md:px-12 xxl:px-18 2xl:px-24 pt-6 md:pt-10 xxl:pt-12",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                                        className: "overflow-x-auto overflow-y-hidden nav w-[95%] sm:w-full",
                                        children: /*#__PURE__*/ jsx_runtime.jsx("nav", {
                                            className: "flex gap-2 xs:gap-4 lg:gap-8",
                                            children: legaPages.map((page, key)=>{
                                                return /*#__PURE__*/ jsx_runtime.jsx("button", {
                                                    onClick: ()=>goToPage(page)
                                                    ,
                                                    className: "last:pr-4 last:mr-8 flex-full inline-flex",
                                                    children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                        className: `uppercase text-[6px] md:text-[10px] xxl:text-xs font-bold font-lato border px-3 lg:px-4 py-1 lg:py-3 transition-all duration-300 ${activePage.uid === page.uid ? "text-jw-green-1 border-jw-green-1" : "text-white/60 border-transparent"}`,
                                                        children: dist/* asText */.Sz(page.data.title)
                                                    })
                                                }, key);
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "flex hero__richtext text-white pt-6 xs:pt-10 lg:pt-16 2xl:pt-20",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                                className: `w-full md:w-3/5 font-neutrafaceText font-book ${loading && "animate-show"}`,
                                                children: activePage && /*#__PURE__*/ jsx_runtime.jsx(react_dist/* PrismicRichText */.v, {
                                                    field: activePage.data.title
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                                className: "w-2/5 justify-center hidden md:flex",
                                                children: /*#__PURE__*/ jsx_runtime.jsx("div", {
                                                    className: "w-12 lg:w-18 2xl:w-26",
                                                    children: /*#__PURE__*/ jsx_runtime.jsx(icon/* default */.Z, {
                                                        icon: "icon-blue",
                                                        className: "text-jw-green-1"
                                                    })
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: `p-6 md:px-12 xxl:px-18 2xl:px-24 pb-20 mt-2 md:mt-6 lg:mt-8 2xl:mt-12 transition-all ${loading && "animate-show"}`,
                            children: [
                                activePage && /*#__PURE__*/ jsx_runtime.jsx("div", {
                                    className: "richtext",
                                    children: /*#__PURE__*/ jsx_runtime.jsx(react_dist/* PrismicRichText */.v, {
                                        field: activePage.data.content
                                    })
                                }),
                                nextPage && /*#__PURE__*/ jsx_runtime.jsx("button", {
                                    onClick: ()=>{
                                        goToPage(nextPage);
                                    },
                                    className: "text-base font-neutrafaceDisplayTitling mt-11",
                                    children: dist/* asText */.Sz(nextPage.data.title) + " >"
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    }) : /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {});
};
/* harmony default export */ const legalPage = (LegalPage);

;// CONCATENATED MODULE: ./components/page.js










const PageComponent = ({ page , navigationHeader , navigationFooter , settings  })=>{
    page.data.slices.map((slice)=>{
        slice.countSlices = page.data.slices.length;
        if (slice.slice_type === "navigation_bar" || slice.slice_type === "hero_gradient" || slice.slice_type === "hero_video" || slice.slice_type === "hero_image") {
            slice.links = navigationHeader.data.Links;
        }
        if (slice.slice_type === "hero_gradient") {
            slice.minimalHeader = page.data.minimalHeader;
        }
        if (slice.slice_type === "fees") {
            slice.fees = page.fees;
        }
        if (slice.slice_type === "store_buttons_cta") {
            slice.settings = settings;
        }
        if (slice.slice_type === "fund_grid") {
            slice.goals = page.goals;
        }
        return slice;
    });
    const seoData = {
        title: dist/* asText */.Sz(page.data.title),
        description: page.data.description,
        image: dist/* asImageSrc */.D2(page.data.image)
    };
    const hasFundGrid = page.data.slices.filter((s)=>s.slice_type === "fund_grid"
    );
    return /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "relative max-w-max mx-auto bg-white overflow-hidden",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(seo/* default */.Z, {
                    data: seoData
                }),
                /*#__PURE__*/ jsx_runtime.jsx(header/* default */.Z, {
                    navigation: navigationHeader,
                    settings: settings,
                    page: page
                }),
                /*#__PURE__*/ jsx_runtime.jsx("div", {
                    id: "content-body",
                    children: /*#__PURE__*/ jsx_runtime.jsx(react_dist/* SliceZone */.pv, {
                        slices: page.data.slices,
                        components: slices/* components */.wx,
                        navHeader: navigationHeader
                    })
                }),
                /*#__PURE__*/ jsx_runtime.jsx(footer/* default */.Z, {
                    navigation: navigationFooter,
                    settings: settings,
                    page: page,
                    countSlices: page.data.slices.length
                }),
                hasFundGrid && /*#__PURE__*/ jsx_runtime.jsx(detailFund, {}),
                /*#__PURE__*/ jsx_runtime.jsx(legalPage, {})
            ]
        })
    });
};
/* harmony default export */ const page = (PageComponent);


/***/ })

};
;