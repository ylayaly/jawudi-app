import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import Hero from '../../components/hero'
import HilightText from '../../components/highlight'

/**
 * @typedef {import("@prismicio/client").Content.HeroValuesSlice} HeroValuesSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroValuesSlice>} HeroValuesProps
 * @param { HeroValuesProps }
 */
const HeroValues = ({ slice }) => {
  const { text } = slice.primary

  return ( <Hero className={"hero-values relative text-white flex items-end"}>
    <div className='bg__gradient bg-cover bg-no-repeat bg-center absolute top-0 left-0 h-1/2 w-full md:w-3/4'></div>
    <div className='absolute left-0 w-full hero-values__bg-image bg-cover bg-no-repeat md:bg-fixed bg-top mg:bg-center -bottom-[30%] md:-bottom-[15%] h-1/2 md:h-1/3'></div>
    <div className='hero-values__bg absolute top-16 sm:top-20 md:top-0 left-0 w-full h-[90%] md:h-[95%] bg-jw-dark-blue'></div>

    <div className={`relative h-full w-full hero__richtext font-neutrafaceText font-book transition-all duration-300 
    px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-0
    pt-40 pb-24  xs:pt-56 lg:pt-42 xs:pb-32 sm:pb-32 sm:pt-48 lg:py-32 xl:py-56
    3xl:container mx-auto
    `}>
      <PrismicRichText field={text} components={{
        heading4: ({children, node}) => {
          return <h4 className='l leading-10 mb-1'>{children}</h4>
        },
        strong: ({children, node}) => {
          return <span className='text-jw-turquoise-4'>{children}</span>
        },
        label: ({children, node}) => {
          if(node && node.data && node.data.label && node.data.label.includes("Highlight")){
            return <HilightText>{children}</HilightText>
          }
          return <span className={node.data.label}>{children}</span>
        }
      }}/>

    </div>
    <svg width={0} height={0}>
        <clipPath id="hero-values_trazado" clipPathUnits="objectBoundingBox" >
          <path id="Trazado_109" data-name="Trazado 109" d="M-2377.086-1051.531c.037,0,.085-.054.143-.093a.236.236,0,0,1,.26-.021c.1.048.126.047.158-.012.016-.03.033-.075.061-.146a.3.3,0,0,1,.057-.093h.321v1a.666.666,0,0,0-.19-.083.827.827,0,0,0-.2-.031c-.026,0-.114,0-.143,0l-.09.012-.144.027c-.133.033-.229.073-.239.074Z" transform="translate(2377.086 1051.896)" fill="#fff"/>
        </clipPath>
    </svg>
    <svg width={0} height={0}>
        <clipPath id="hero-values_trazado_m" clipPathUnits="objectBoundingBox" >
          <path id="Trazado_271" data-name="Trazado 271" d="M-2443.631-989.179a1.4,1.4,0,0,0,.251-.073.771.771,0,0,1,.434-.016c.171.038.21.037.264-.01.008-.007.042-.032.051-.041v.973a.693.693,0,0,0-.435-.12,1.921,1.921,0,0,0-.565.148Z" transform="translate(2443.631 989.319)" fill="#fff"/>
        </clipPath>
    </svg>
    <style jsx>{`
        .hero-values__bg {  
          clip-path: url(#hero-values_trazado);
        }
        .hero-values__bg-image{
          background-image: url(${slice.primary.background_image?.url});
        }
        @media (max-width: 767px) {
          .hero-values__bg {
            clip-path: url(#hero-values_trazado_m);
          }
        }
    `}</style>
  </Hero>
)}

export default HeroValues