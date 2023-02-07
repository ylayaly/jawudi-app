import { useState, useEffect } from 'react'
import { PrismicRichText } from '@prismicio/react'
import { PrismicLink } from '@prismicio/react'
import { useAppContext } from '../context/appContext'
import Icon from './icon'
import Socials from './socials'
import Link from 'next/link'

export default function Footer({navigation, settings, page, countSlices}) {
    const [navClass, setNavClass] = useState(true)
    
    const [isSmallContent, setIsSmallContent] = useState(false)
    const {FooterText, NMLS, contact_link} = settings.data
    const { footerMobileLight, showTopFooter } = page.data
    const { appStore, playStore } = settings.data
    const { inputFocus } = useAppContext();

    navigation.sort((a, b) => {
        if ( a.data.order < b.data.order )
            return -1
        if ( a.data.order > b.data.order )
            return 1
        return 0
    })
    
    useEffect(() => {
        let changing = false
        let isFocus = false

        let interval = setInterval(() => {
            changing = false
        }, 5000)

        const handleResize = () => {
            if(!changing){
                const el = document.getElementById("content-body")
                changing = true
                setIsSmallContent(window.innerWidth < 768 && (el.clientHeight - 250) < window.innerHeight)
            }
        }
        setTimeout(handleResize, 300)
        
        const handleScroll = () => {
            if(!isFocus){
                if(document.body.clientWidth > 400)
                    window.scrollY < 60 ? setNavClass(true) : setNavClass(false)
                else if(document.body.clientHeight < window.innerHeight)
                    setNavClass(false)
                else
                    window.scrollY <= 0 ? setNavClass(true) : setNavClass(false)
            }
            
        }

        document.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleResize, { passive: true })

        return () => {
          document.removeEventListener('scroll', handleScroll)
          window.addEventListener('resize', handleResize)
          clearInterval(interval);
        }
    }, [])

    return (
        <>
        <footer className={'footer max-w-max mx-auto lg:bg-white '+ (navClass && !inputFocus && !footerMobileLight ? 'fixed xs:relative' : 'relative')}>
            <div className={'absolute inset-0 w-full h-full ' + (showTopFooter ? 'bg-footer' : 'bg-footer-2')}></div>
            <div className={'relative w-full h-full px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 hidden md:block ' + (showTopFooter && "pt-16 lg:pt-24 xl:pt-32 2xl:pt-48")}>
                <div className='footer__container 3xl:container mx-auto grid lg:grid-cols-4 pt-8 lg:pt-16 pb-2 md:pb-4 lg:pb-16 gap-x-8'>
                    <div className='lg:col-span-3'>
                        <div className='grid grid-cols-3 xl:flex xl:flex-nowrap gap-4 lg:gap-12 xl:gap-24 2xl:gap-40'>
                            {navigation.map( (nav, kNav) => {
                                const {TitleSection, Links} = nav.data 
                                return (
                                    <div key={"nav-"+kNav}>
                                        <span className='text-white font-semibold font-lato text-xs lg:text-sm uppercase tracking-xl'>{TitleSection}</span>
                                        <div className='flex flex-col gap-3 xl:gap-5 mt-8 xl:mt-11'>
                                            {Links.map( (l, key) => {
                                                return (
                                                    (l.Link && l.Link.link_type !== "Any") ?
                                                        <PrismicLink field={l.Link} key={"prismicLink-" + key} className={"text-left"}>
                                                            <span className='text-white text-xs lg:text-sm text-semibold' key={"link-" + key} style={{ color : l.textColor ? l.textColor : "white" }}>{l.LinkText}</span>
                                                        </PrismicLink>
                                                    :
                                                        <span className='text-white text-xs lg:text-sm text-semibold cursor-pointer' key={"_" + key} style={{ color : l.textColor ? l.textColor : "white" }}>{l.LinkText}</span>
                                                )
                                            } )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='footer__text-made hidden lg:block pt-24 xl:pt-32 2xl:pt-64 3xl:pt-80 text-white tracking-xl font-bold uppercase text-[10px] xl:text-xs'><PrismicRichText field={FooterText}/></div>
                    </div>
                    <div className='lg:col-span-1'>
                        <div className='flex flex-col justify-between h-full text-jw-green-1'>
                            <div className='grid grid-cols-3 gap-4 lg:gap-20 2xl:gap-40 lg:block mb-8 lg:mb-0'>
                                <Socials settings={settings} className={'lg:justify-end mt-6 lg:mt-0 xl:gap-6'} />
                                <div></div>
                                <div className='lg:text-right mt-8'>
                                    <PrismicLink field={contact_link}> 
                                        <span className='font-lato font-bold px-4 py-3 text-jw-green-1 border border-jw-green-1 rounded-xl text-xs tracking-2lg'>CONTACT US</span>
                                    </PrismicLink>
                                </div>
                            </div>
                            <div className='flex justify-between lg:justify-end items-end md:pt-10 lg:pt-32 2xl:pt-48'>
                                <div className='footer__text-made block lg:hidden text-white tracking-xl font-bold uppercase text-[10px] xl:text-xs'><PrismicRichText field={FooterText}/></div>
                                <div className='font-lato text-[10px] xl:text-xs tracking-xl'>
                                    {NMLS}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'block md:hidden bg-footer-bottom '+ (navClass && !inputFocus ? 'pt-12 xs:pt-0' : '')}>
                <div className={'footer__store flex justify-center gap-4 text-white px-16 pt-6 ' + (navClass && !inputFocus && !footerMobileLight ? 'block xs:hidden' : 'hidden')}>
                    <PrismicLink field={appStore}><Icon icon={'apple'} /></PrismicLink>
                    <PrismicLink field={playStore}><Icon icon={'android'} /></PrismicLink>
                </div>
                <div className={'footer__policies flex justify-between items-end text-xxs xs:text-9 bg-jw-dark-blue '+ (navClass && !inputFocus && !footerMobileLight ? ' py-4 px-6 mt-10 xs:mt-0 ' : ' py-4 px-6')}>
                    <div className='font-lato tracking-xl text-jw-green-1'>
                        {NMLS}
                    </div>
                    <div className='footer__text-made text-white tracking-xl font-bold uppercase'><PrismicRichText field={FooterText}/></div>
                </div>
            </div>
        </footer>
        {isSmallContent && <div className='h-[30vh] w-full bg-jw-dark-blue'></div> }
        </>
    )
}