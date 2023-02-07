import React, {useState, useEffect} from 'react'
import { PrismicLink } from '@prismicio/react'

const Navigation = ({ items }) => {
  const [scrollClass, setScrollClass] = useState(false)
  const links = items.filter(l => l.Type === "Desktop" || l.Type === "Desktop & Mobile")

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 240 ? setScrollClass(true) : setScrollClass(false)
    }
    document.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return <div className='header-navigation px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 bg-white'>
      <div className={'3xl:container mx-auto hidden md:flex justify-between transition-spacing ease-in-out delay-500 ' + (scrollClass ? "py-6 xl:py-10 2xl:py-16" : "py-10 xl:py-14 2xl:py-24")}>
          {links.map((link, i) => {
            return (
              (link.Link && link.Link.link_type !== "Any") ?
              <PrismicLink field={link.Link}>
                <span key={i} className={'uppercase font-lato text-xs xl:text-xl font-bold tracking-xl ' + ( i === 0 ? 'active' : '' )}>{link.LinkText}</span>
              </PrismicLink>
              :
              <span key={i} className={'uppercase font-lato text-xs xl:text-xl font-bold tracking-xl ' + ( i === 0 ? 'active' : '' )}>{link.LinkText}</span>
            )
          })}
      </div>
    </div>
}

export default Navigation