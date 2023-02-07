import { useState, useEffect } from 'react'
import { PrismicLink } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useAppContext } from '../context/appContext'
import LogoDark from './icons/logo'
import IconLogoLight from './icons/iconLogoLight'
import Link from 'next/link'
import Socials from './socials'
import Icon from './icon'
import LogoLight from './icons/logoLight'
import Logo from '../assets/img/logo.svg'


export default function Header({ navigation, settings, page }) {
    const { minimalHeader, logoColor, logoMobileColor, headerMobileWhite, showStoreBtn } = page.data
    const { QRcode, textQRCode, text_call_to_action_qr } = settings.data
    const [navClass, setNavClass] = useState(false)
    const [open, setOpen] = useState(false)
    const [close, setClose] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const { showCallQR, changeCallQR, openedLegal } = useAppContext();
    const [showQR, setShowQR] = useState(false)
    const links = navigation.data.slices.filter(l => l.primary.type !== "Desktop")
    const desktopLinks = navigation.data.slices.filter(l => l.primary.type !== "Mobile")
    const src = prismicH.asImageSrc(QRcode)
    const router = useRouter()
    var current = router.asPath.replace(/\//g, "")
    current = current === "" ? "home" : current

    desktopLinks.map(l => {
        l.open = false;
        return l
    })

    function closeMenu() {
        setOpen(false);
        setClose(true)
        setTimeout(function () {
            setClose(false)
        }, 800)
    }

    useEffect(() => {
        function legalClick(){
            document.querySelectorAll('[data-href]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault()
                    if(e && e.target && e.target.closest("a")){
                        openedLegal(e.target.closest("a").dataset.href)
                    }
                    return false;
                }, true)
            });
        }
        setIsMobile(document.body.clientWidth < 768)
        const handleScroll = () => {
            if (document.body.clientWidth > 400)
                window.scrollY > 30 ? setNavClass(true) : setNavClass(false)
            else if (document.body.clientHeight < window.innerHeight)
                setNavClass(true)
            else
                window.scrollY > 5 ? setNavClass(true) : setNavClass(false)
        }
        const handleResize = () => {
            setIsMobile(document.body.clientWidth < 768)
        }
        document.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleResize, true)
        setTimeout(legalClick, 120)

        return () => {
            document.removeEventListener('scroll', handleScroll)
            window.addEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        const viewQRReady = window.localStorage.getItem('viewQRReady')
        if(showStoreBtn && viewQRReady === null){
            setTimeout(() => {
                setShowQR(true)
                setTimeout(() => {
                    setShowQR(false)
                    window.localStorage.setItem('viewQRReady', true)
                }, 3000)
            }, 1000)
            
        }
    }, [showStoreBtn])


    const headerMobileWhiteClass = headerMobileWhite ? ' relative md:absolute pb-8' : ' absolute'
    const bgHeader = headerMobileWhite ? 'bg-white ' : 'bg-jw-turquoise-1 md:bg-white '

    return (
        <><header className={'max-w-max mx-auto top-0 right-0 left-0 h-auto px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 ' + (navClass ? !minimalHeader ? "fixed bg-white " : "fixed " : ((minimalHeader ? "bg-transparent" : "bg-white xl:pb-14") + headerMobileWhiteClass + " pt-8 xs:pt-10 xxl:pt-20"))}>
            <div className={bgHeader + ' absolute h-full right-0 top-0 w-full transition-opacity ease-in-out duration-1000 ' + ((navClass && minimalHeader) ? "opacity-100 md:opacity-70" : "opacity-0")}></div>
            <div className='3xl:container relative mx-auto flex justify-between items-stretch'>
                <div className='py-4'>
                    {navClass ?
                        <Link href={"/"}>
                            <a className='block h-6 md:w-8 md:h-8'>
                                <Icon icon="icon-blue" className={"text-jw-blue-1 hidden md:block"} />
                                <span className='block h-6 w-28 md:hidden'>
                                    <LogoDark />
                                </span>
                            </a>
                        </Link>
                        :
                        <Link href={"/"}>
                            <a className='flex items-center h-6 lg:h-10 3xl:h-12 w-28 md:w-32 lg:w-36 xl:w-40 3xl:w-44'>
                                {isMobile ? 
                                    <Icon icon='logo-jawudi' className={logoMobileColor === "Dark" || (logoMobileColor === "Light" && headerMobileWhite)  ? 'text-jw-dark-blue' : logoMobileColor === "Light" ? 'text-white' : 'text-jw-green-1'} />
                                     :
                                    <Icon icon='logo-jawudi' className={logoColor === "Dark" || (logoColor === "Light" && headerMobileWhite && isMobile) ? 'text-jw-dark-blue' : logoColor === "Light" ? 'text-white' : 'text-jw-green-1'} />
                                }
                            </a>
                        </Link>}
                </div>
                <div className={'hidden md:flex header-navigation gap-6 xxl:gap-12 2xl:gap-16 ' + (navClass || !minimalHeader ? 'text-jw-dark-blue' : 'text-white')}>
                    {desktopLinks.map((l, i) => {
                        if (l.items.length > 0 && l.items[0].link_text) {
                            return <ListNavBar key={'p-link-' + i} data={l.primary} current={current} items={l.items} i={i}
                                btnClass={'uppercase font-lato font-bold text-xs lg:text-sm tracking-lg xl:tracking-widest 2xl:tracking-xl'}
                                itemClass={'font-lato font-bold text-xs lg:text-sm'}
                                navClass={navClass}
                                closeMenu={closeMenu}
                            />
                        } else {
                            return (
                                <div key={'d-link-' + i} className='relative md:flex items-center'>
                                    {(l.primary.link && l.primary.link.link_type !== "Any") ?
                                        <PrismicLink key={'p-link-' + i} field={l.primary.link}>
                                            <span key={'link-' + i} className={'uppercase font-lato font-bold text-xs lg:text-sm tracking-lg xl:tracking-widest 2xl:tracking-xl ' + (l.primary.link.uid === current ? 'active' : '')}>{l.primary.link_text}</span>
                                        </PrismicLink>
                                        :
                                        <span key={'no-link-' + i} className={'uppercase font-lato font-bold text-xs lg:text-sm tracking-lg xl:tracking-widest 2xl:tracking-xl '}>{l.primary.link_text}</span>
                                    }
                                </div>
                            );
                        }
                    })

                    }
                </div>
                <div className='logo-blue flex md:hidden'>
                    <button type="button" onClick={() => setOpen(true)}>
                        <Icon icon="icon-blue" className={logoMobileColor === "Light" && !navClass && !headerMobileWhite ? "text-jw-green-2" : "text-jw-blue-1"} />
                    </button>
                </div>
            </div>
            <div id="header-nav" className={'md:hidden transition-opacity fixed inset-0 ' + (open ? 'bg-white  min-h-screen overflow-scroll' : close ? 'close' : 'hidden')}>
                <div id="nav-links" className={'relative h-auto '}>
                    <div className='bg-header-mobile pb-40'>
                        <div className='absolute right-0 top-0 pt-20 px-9 md:px-12 z-10'>
                            <button className='w-5 h-5' type="button" onClick={() => { closeMenu() }}><Icon icon="close" /></button>
                        </div>
                        <div className='pt-20 px-9 md:px-12 relative text-jw-green-4 font-lato tracking-xl font-medium uppercase flex flex-col gap-8 '>
                            {links.map((link, i) => {
                                if (link.items.length > 0 && link.items[0].link_text) {
                                    return <ListNavBar key={i} data={link.primary} current={current} items={link.items} i={i} itemClass={'w-full block capitalize text-xs tracking-normal ml-12'} btnClass={'w-full block uppercase tracking-xl text-left'} navClass={navClass} closeMenu={closeMenu} />
                                } else {
                                    return (
                                        (link.primary.link && link.primary.link.link_type !== "Any") ?
                                            <PrismicLink key={'nav-p-link-' + i} field={link.primary.link}>
                                                <span key={'nav-link-' + i} onClick={() => { closeMenu() }} className={'w-full block text-left tracking-xl'}>{link.primary.link_text}</span>
                                            </PrismicLink>
                                            :
                                            <span key={'nav-no-link-' + i} onClick={() => { closeMenu() }} className={'w-full block text-left tracking-xl'}>{link.primary.link_text}</span>
                                    )
                                }
                            })}
                        </div>
                        <div className='relative px-9 md:px-12 mt-18 text-jw-green-1'>
                            <Socials settings={settings} className="xl:gap-6" />
                        </div>
                    </div>
                    <div className='left-0 right-0 bottom-0 px-9 md:px-12 pb-28'>
                        <div className='w-28 md:w-48'><Link href={"/"}><a><LogoDark /></a></Link></div>
                    </div>
                </div>
            </div>
            <div></div>
        </header>
            {(showStoreBtn && QRcode) &&
                <div className={`absolute hidden md:flex top-26 lg:top-32 xxl:top-40 2xl:top-52 right-0 overflow-hidden items-center gap-4`}>
                    <label onClick={() => { setShowQR(!showQR); changeCallQR(false) }} className={`relative z-10 cursor-pointer transition-all translate-x-[87%] lg:translate-x-[82%] xl:translate-x-[70%] xxl:translate-x-[85%] mr-8 2xl:mr-12 text-white/50 text-lg xxl:text-2xl font-neutrafaceText animate-pulseTextQR font-book ${showCallQR && !showQR ? 'opacity-100' : 'opacity-0'}`}>{text_call_to_action_qr}</label>
                    <div onClick={() => { setShowQR(!showQR); changeCallQR(false) }} className={`flex items-center transition-all duration-1000 z-10 cursor-pointer gap-2 2xl:gap-4 ${showQR ? 'translate-x-0' : 'translate-x-[87%] lg:translate-x-[82%] xxl:translate-x-[85%]'}`}>
                        <span className={`btn btn__more btn_qr block transition-all duration-1000  ${showQR ? 'rotate-90' : '-rotate-90'}`}></span>
                        <div className='bg-white rounded-l-lg lg:rounded-l-xxl hidden md:block'>
                            <div className='gap-4 xxl:gap-8 items-center p-2 lg:p-4 flex'>
                                <div className='h-auto rounded-lg max-w-20 2xl:max-w-24 3xl:max-w-33'>
                                    <img src={src} alt={QRcode.alt} />
                                </div>
                                <div className='max-w-20 xxl:max-w-26'>
                                    <span className='font-semibold text-9 xxl:text-xs leading-tight text-center font-lato text-jw-dark-blue uppercase block w-full mb-3'>{textQRCode}</span>
                                    <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


const ListNavBar = (data) => {
    const d = data.data
    const it = data.items
    const [open, setOpen] = useState(false)

    function close() {
        setTimeout(() => {
            setOpen(false);
            data.closeMenu();
        }, 120)
    }

    function show(ev) {
        setOpen(!open);
        ev.target.focus()
    }

    return (
        <div className={'relative md:flex'} key={data.i}>
            <button key={'no-link-' + data.i} className={data.btnClass} onClick={(ev) => show(ev)} onBlur={() => close()}>{d.link_text}</button>
            <div className={`w-full md:w-40 md:absolute flex flex-col gap-5 transition-all duration-700 overflow-hidden h-auto md:-left-4 md:px-4 top-full ${open ? 'max-h-[10rem] md:py-4 mt-5 md:mt-[2px]' : 'max-h-0'} ${!data.navClass && 'top-[70%]'} ${(open && data.navClass) && 'md:bg-white/70 '}`}>
                {it.map((item, j) => {
                    return (
                        (item.link && item.link.link_type !== "Any") ?
                            <PrismicLink key={'p-link-' + j} field={item.link}>
                                <span key={'link-' + data.i} className={data.itemClass + (item.link.uid === data.current ? ' active' : '')}>{item.link_text}</span>
                            </PrismicLink>
                            :
                            <span key={'no-link-' + data.i} className={data.itemClass}>{item.link_text}</span>
                    );
                })

                }
            </div>
        </div>
    )
}