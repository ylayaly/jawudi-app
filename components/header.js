import { useState, useEffect } from 'react'
import Image from 'next/image'
import { PrismicLink } from '@prismicio/react'
import LogoDark from './icons/logo'
import IconBlue from '../assets/img/icon-blue.png'
import Link from 'next/link'
import Socials from './socials'
import Icon from './icon'

export default function Header({navigation, settings}) {
    const [navClass, setNavClass] = useState(false)
    const [open, setOpen] = useState(false)
    const [close, setClose] = useState(false)
    const links = navigation.data.Links.filter(l => l.Type === "Mobile" || l.Type === "Desktop & Mobile")

    function closeMenu(){
        setOpen(false); 
        setClose(true)
        setTimeout(function(){
            setClose(false)
        }, 800)
    }
    useEffect(() => {
        const handleScroll = () => {
          window.scrollY > 60 ? setNavClass(true) : setNavClass(false)
        }
        document.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
          document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={'top-0 right-0 left-0 h-auto z-20 px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 ' + (navClass ? "fixed bg-jw-turquoise-1 py-6 md:py-10 " : "absolute bg-transparent pt-16 xs:pt-20 xl:pt-32")}>
            <div className='3xl:container mx-auto flex justify-between'>
                <div className='w-28 md:w-48'><Link href={"/"}><a><LogoDark /></a></Link></div>
                <div className='logo-blue flex md:hidden'>
                    <button type="button" onClick={() => setOpen(true)}><Image src={IconBlue} /></button>
                </div>
            </div>
            <div id="header-nav" className={'md:hidden transition-opacity fixed inset-0 ' + (open ? 'bg-white  min-h-screen overflow-scroll' : close ? 'close' : 'hidden')}>
                <div id="nav-links" className={'relative h-auto '}>
                    {/* <div className=' absolute w-full h-full'></div> */}
                    <div className='bg-header-mobile pb-40'>
                        <div className='absolute right-0 top-0  pt-20  px-9 md:px-12 z-10'>
                            <button className='w-5 h-5' type="button" onClick={() => {closeMenu()}}><Icon icon="close"/></button>
                        </div>
                        <div className= 'pt-20  px-9 md:px-12 relative text-jw-green-4 font-lato tracking-xl font-medium uppercase flex flex-col gap-8 '>
                            {links.map((link, i) => {
                                return (
                                    (link.Link && link.Link.link_type !== "Any") ?
                                    <PrismicLink field={link.Link}>
                                    <span key={i} className={' ' + ( i === 0 ? 'active' : '' )}>{link.LinkText}</span>
                                    </PrismicLink>
                                    :
                                    <span key={i} className={' ' + ( i === 0 ? 'active' : '' )}>{link.LinkText}</span>
                                )
                            })}
                        </div>
                        <div className='relative px-9 md:px-12 mt-18 text-jw-green-1'>
                                <Socials settings={settings} className="" />
                        </div>
                    </div>
                    <div className='left-0 right-0 bottom-0 px-9 md:px-12 pb-28'>
                        <div className='w-28 md:w-48'><Link href={"/"}><a><LogoDark /></a></Link></div>
                    </div>
                </div>
            </div>
            
        </header>
    )
}