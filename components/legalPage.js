import { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import { PrismicRichText } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers'
import Icon from './icon';

const LegalPage = (() => {
    const [activePage, setActivePage] = useState(null)
    const [nextPage, setNextPage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [closing, setClosing] = useState(false)
    const { openedLegal, openLegal, legaPages } = useAppContext();

    const close = () => {
        setClosing(true)
        setTimeout(() => {
            setActivePage(null)
            openedLegal(null)
            setClosing(false)
        }, 800)
    }

    const goToPage = (page) => {
        setLoading(true)
        setActivePage(page)
        setNextPage(getNext(page))
        document.querySelector("#legal-page").scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setTimeout(() => {
            setLoading(false)
        }, 300)
    }

    const getNext = (page = null) => {
        const uid = page ? page.uid : activePage?.uid
        const current = legaPages.findIndex(p => {
            return p.uid == uid
        })
        let next = null
        if(current + 1 == legaPages.length){
            next = legaPages[0];
        }else if(current != -1){
            next = legaPages[current + 1]
        }

        return next
    }

    const handleSubmit = async (event) => {
        if(legaPages){
            const current = legaPages.find(p => p.uid == openLegal)
            setActivePage(current)
            setNextPage(getNext(current))
        }
    }

    useEffect(() => {
        handleSubmit()
    }, [openLegal])

    

    return(
        activePage ? <section id="legal-page" className={`legal-page fixed inset-0 w-full h-full z-form overflow-auto animate-show ${closing && 'animate-hide'}`}>
            <div className='fixed inset-0 bg-jw-dark-blue/90 cursor-pointer' onClick={close}></div>
            <svg width={0} height={0}>
                <clipPath id="trazado" clipPathUnits="objectBoundingBox">
                    <path id="Trazado_191" data-name="Trazado 191" d="M-2421.726-1101.151c.056,0,.166-.131.257-.23a.256.256,0,0,1,.394-.05c.156.116.191.115.24-.03.025-.073.1-.386.108-.4v-.293h-1S-2421.728-1101.151-2421.726-1101.151Z" transform="translate(2421.727 1102.151)" fill="#fff"/>
                </clipPath>
            </svg>
            <svg width={0} height={0}>
                <clipPath id="trazado_m" clipPathUnits="objectBoundingBox">
                    <path id="Trazado_194" data-name="Trazado 194" d="M-2465.266-1138.313c.058.063.154-.049.272-.129a.367.367,0,0,1,.407-.033c.161.075.2.075.248-.019a1.591,1.591,0,0,0,.07-.162v-.638h-1S-2465.272-1138.32-2465.266-1138.313Z" transform="translate(2465.269 1139.294)" fill="#fff"/>
                </clipPath>
            </svg>
            <div className='flex justify-center w-full py-40'>
                <div className="relative rounded-3xl bg-white w-10/12 text-jw-dark-blue">
                    <div className='absolute right-0 lg:-top-[1px] z-30'>
                            <button className='close w-11 h-11 lg:w-16 lg:h-16' onClick={close}></button>
                    </div>
                    <div className='bg_hero relative bg-gradient-to-r from-jw-turquoise-6 to-jw-turquoise-5 rounded-t-3xl pb-12 sm:pb-24 2xl:pb-32'>
                        <div className='px-6 md:px-12 xxl:px-18 2xl:px-24 pt-6 md:pt-10 xxl:pt-12'>
                            <div className='overflow-x-auto overflow-y-hidden nav w-[95%] sm:w-full'>
                                <nav className='flex gap-2 xs:gap-4 lg:gap-8'>
                                    {legaPages.map((page, key) => {
                                        return <button key={key} onClick={() => goToPage(page)} className="last:pr-4 last:mr-8 flex-full inline-flex">
                                            <span className={`uppercase text-[6px] md:text-[10px] xxl:text-xs font-bold font-lato border px-3 lg:px-4 py-1 lg:py-3 transition-all duration-300 ${activePage.uid === page.uid ? 'text-jw-green-1 border-jw-green-1' : 'text-white/60 border-transparent'}`}>{prismicH.asText(page.data.title)}</span>
                                        </button>
                                    })}
                                </nav>
                            </div>
                            <div className="flex hero__richtext text-white pt-6 xs:pt-10 lg:pt-16 2xl:pt-20">
                                <div className={`w-full md:w-3/5 font-neutrafaceText font-book ${loading && 'animate-show'}`}>
                                    {activePage &&
                                        <PrismicRichText field={activePage.data.title} />
                                    }
                                </div>
                                <div className='w-2/5 justify-center hidden md:flex'>
                                    <div className="w-12 lg:w-18 2xl:w-26"><Icon icon="icon-blue" className={"text-jw-green-1"} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`p-6 md:px-12 xxl:px-18 2xl:px-24 pb-20 mt-2 md:mt-6 lg:mt-8 2xl:mt-12 transition-all ${loading && 'animate-show'}`}>
                        {activePage && <div className='richtext'>
                            <PrismicRichText field={activePage.data.content}/>
                        </div>}
                        {nextPage && 
                            <button onClick={() => {goToPage(nextPage)}} className='text-base font-neutrafaceDisplayTitling mt-11' >{prismicH.asText(nextPage.data.title) + " >"}</button>
                        }
                    </div>
                </div>
            </div>
        </section> : <></>
    )
});

export default LegalPage;
