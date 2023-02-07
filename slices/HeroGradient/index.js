import React, {useState, useEffect} from 'react'
import { PrismicRichText, PrismicLink } from '@prismicio/react'

const HeroGradient = ({ slice }) => {
  const { title, textLink, link } = slice.primary
  const [scrollClass, setScrollClass] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollClass(window.scrollY > 20)
    }
    document.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return <section className='hero hero-gradient pt-header w-full sticky -top-16 sm:-top-22 md:-top-40 lg:-top-120 xxl:-top-144 2xl:-top-166 z-20'>
    <div className={'bg-gradient-to-r from-[#268689] to-[#1F6D7D] md:h-112 lg:h-144 2xl:h-180 3xl:h-200 flex items-end justify-between px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 pb-5 transition-all duration-500 ' + (scrollClass ? "md:pb-10 xl:pb-16 3xl:pb-24" : "md:pb-20 xl:pb-32 3xl:pb-40")}>
      <div className='3xl:container mx-auto w-full flex items-end justify-between pt-16 md:pt-44'>
        <div className='hero__richtext text-white font-bold'>
          {title &&
              <PrismicRichText field={title}/>
          }
        </div>
        <div className='hero__richtext text-white border-b-2 xl:border-b-4 border-white lg:pb-3 hidden md:block cursor-pointer'>
          {(link && link.link_type !== "Any") ?
              <PrismicLink field={link}>
                <span className='font-bold text-xs md:text-sm lg:text-lg 3xl:text-xl tracking-widest'>{textLink}</span>
              </PrismicLink>
              :
              <span className='font-bold text-xs md:text-sm lg:text-lg 3xl:text-xl tracking-widest'>{textLink}</span>
          }
        </div>
      </div>
    </div>
  </section>
}

export default HeroGradient