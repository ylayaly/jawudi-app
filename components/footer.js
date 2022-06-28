import { useState, useEffect } from 'react'
import { PrismicRichText } from '@prismicio/react'
import { PrismicLink } from '@prismicio/react'
import Icon from './icon'
import Socials from './socials'

export default function Footer({navigation, settings}) {
    const [navClass, setNavClass] = useState(true)
    const socials = settings.data.SocialNetwork
    const {FooterText, NMLS} = settings.data

    navigation.sort((a, b) => {
        if (
            a.data.order < b.data.order
        )
            return -1
        if (
            a.data.order > b.data.order
        )
            return 1
        return 0
    })

    useEffect(() => {
        const handleScroll = () => {
          window.scrollY < 200 ? setNavClass(true) : setNavClass(false)
        }
        document.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
          document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <footer className={'footer '+ (navClass ? 'fixed md:relative' : 'relative')}>
            <div className='bg-footer absolute inset-0 w-full h-full'></div>
            <div className={'relative w-full h-full px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 pt-16 lg:pt-24 xl:pt-32 2xl:pt-48 hidden md:block'}>
                <div className='footer__container 3xl:container mx-auto grid lg:grid-cols-4 pt-12 lg:pt-16 pb-2 xl:pb-16'>
                    <div className='lg:col-span-3'>
                        <div className='grid grid-cols-3 xl:flex xl:flex-nowrap gap-4 xl:gap-24'>
                            {navigation.map( (nav, kNav) => {
                                const {TitleSection, Links} = nav.data 
                                return (
                                    <div key={"nav-"+kNav}>
                                        <span className='text-white font-medium font-lato text-md lg:text-xl 2xl:text-22 uppercase tracking-xl'>{TitleSection}</span>
                                        <div className='flex flex-col gap-3 xl:gap-6 mt-6 xl:mt-10'>
                                            {Links.map( (l, key) => {
                                                return (
                                                    (l.Link && l.Link.link_type !== "Any") ?
                                                    <PrismicLink field={l.Link} key={"prismicLink-" + key}>
                                                        <span className='text-white text-md lg:text-xl 2xl:text-2xl text-medium' key={"link-" + key} style={{ color : l.textColor ? l.textColor : "white" }}>{l.LinkText}</span>
                                                    </PrismicLink>
                                                    :
                                                    <span className='text-white text-md lg:text-xl 2xl:text-2xl text-medium cursor-pointer' key={"_" + key} style={{ color : l.textColor ? l.textColor : "white" }}>{l.LinkText}</span>
                                                )
                                            } )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='footer__text-made hidden lg:block pt-24 xl:pt-32 2xl:pt-64 3xl:pt-80 text-white tracking-xl font-bold uppercase text-md xl:text-lg 2xl:text-xl'><PrismicRichText field={FooterText}/></div>
                    </div>
                    <div className='lg:col-span-1'>
                        <div className='flex flex-col justify-between h-full text-jw-green-1'>
                            <Socials settings={settings} className={'lg:justify-center mt-10 lg:mt-0'} />
                            <div className='flex justify-between items-end md:pt-16 lg:pt-32 2xl:pt-48'>
                                <div className='footer__text-made block lg:hidden text-white tracking-xl font-bold uppercase text-md xl:text-lg 2xl:text-xl'><PrismicRichText field={FooterText}/></div>
                                <div className='font-lato text-lg xl:text-xl 2xl:text-22  tracking-xl pb-10'>
                                    {NMLS}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className={'block md:hidden bg-footer-bottom '+ (navClass ? 'pt-12' : '')}>
                <div className={'footer__store flex gap-4 text-white font-lato px-12 ' + (navClass ? 'block' : 'hidden')}>
                    <div className='w-3/4 flex justify-evenly items-center border border-white rounded-full py-2 px-3'>
                        <span className='w-8 h-8 mr-2'><Icon icon={'apple'} /></span>
                        <div>
                            <small className='block font-medium text-xxs'>Download on the</small>
                            <small className='text-xs'>App Store</small>
                        </div>
                    </div>
                    <div className='w-3/4 flex justify-evenly items-center border border-white rounded-full py-2 px-3'>
                        <span className='w-8 h-8 mr-2'><Icon icon={'android'} /></span>
                        <div>
                            <small className='block font-medium text-xxs'>Get it on</small>
                            <small className='text-xs'>Google Play</small>
                        </div>
                    </div>
                </div>
                <div className={'footer__policies flex justify-between items-end px-8 pb-8 text-9 '+ (navClass ? 'pt-12' : 'py-8')}>
                    <div className='footer__text-made text-white tracking-xl font-bold uppercase'><PrismicRichText field={FooterText}/></div>
                    <div className='font-lato tracking-xl text-jw-green-1'>
                        {NMLS}
                    </div>
                </div>
            </div>
        </footer>
    )
}