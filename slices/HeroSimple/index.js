import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import ArrowWhite from '../../assets/img/arrow-white.svg'
import Image from 'next/image'
import Link from 'next/link'

const HeroSimple = ({ slice }) => {
    const { sliceImage, title, subtitle, mobileImage } = slice.primary

    return (
        <section className='hero-products'>
            <div className={'relative min-h-112 flex items-end transition-all duration-300 md:min-h-220 xl:min-h-180 2xl:min-h-296 px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46'}>
                <div className='absolute inset-0 bg-cover bg-center hero-products__bg' ></div>
                <div className='relative 3xl:container 3xl:mx-auto pt-48 pb-20 xl:py-28 2xl:py-48 w-full hero__richtext text-white'>
                {title &&
                    <div className='font-medium'><PrismicRichText field={title}/></div>
                }
                {subtitle &&
                    <div className='mt-2 md:mt-3 xxl:mt-5'>
                      <PrismicRichText field={subtitle}/>
                    </div>
                }
                <div className="mt-2 block md:hidden">
                    <div className='transform -rotate-90 h-max w-3 md:w-max'>
                      <Link href={"#bottom"} ><a >
                        <Image src={ArrowWhite} alt="" />
                      </a></Link>
                    </div>
                  
                </div>
                
                </div>
            </div>
            <span className="#bottom"></span>
            <style jsx>{`
              .hero-products__bg {
                background-image : url(${sliceImage.url});    
              }
              @media (max-width: 640px) {
                .hero-products__bg {
                  background-image : url(${mobileImage.url})
                }
              }
          `}</style>
       </section>
    )
}

export default HeroSimple
