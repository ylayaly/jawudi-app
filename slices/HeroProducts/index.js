import { PrismicRichText } from '@prismicio/react'
import LinkWrapper from '../../components/LinkWrapper'
import Icon from '../../components/icon'
import HilightText from '../../components/highlight'

const HeroProducts = ({ slice }) => {
    const { sliceImage, title, subtitle, subtitle_highlight, subtitleMobile, linkText, link, mobileImage } = slice.primary

    return (
        <section className='hero-products bg-jw-dark-blue'>
            <svg width={0} height={0}>
                <clipPath id="trazado" clipPathUnits="objectBoundingBox" >
                  <path id="Trazado_192" data-name="Trazado 192" d="M-6445.112,5269.308c-.066-.054-.163-.061-.31,0a1.133,1.133,0,0,1-.412.119.748.748,0,0,1-.249-.1.023.023,0,0,0-.03.017v-.916h1Z" transform="translate(6446.112 -5268.426)" fill="#051834"/>
                </clipPath>
            </svg>
            <svg width={0} height={0}>
                <clipPath id="trazado_m" clipPathUnits="objectBoundingBox" >
                  <path id="Trazado_195" data-name="Trazado 195" d="M-6422.27,5699.977c-.082-.069-.162-.088-.354-.035a1.836,1.836,0,0,1-.425.082.68.68,0,0,1-.22-.056s0-.944,0-.944h1S-6422.268,5699.978-6422.27,5699.977Z" transform="translate(6423.269 -5699.023)" fill="#051834"/>
                </clipPath>
            </svg>
            <div className={'relative font-neutrafaceText font-book max-h-screen min-h-112 flex items-end transition-all duration-300 md:min-h-200 2xl:min-h-220 3xl:min-h-[54rem] px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46'}>
                <div className='absolute inset-0 bg-cover bg-center md:bg-right-bottom xxl:bg-center hero-products__bg'></div>
                <div className='relative 3xl:container 3xl:mx-auto pt-48 pb-20 lg:py-32 xxl:py-24 3xl:py-32 w-full hero__richtext text-white'>
                {title &&
                    <div className='font-medium'><PrismicRichText field={title}/></div>
                }
                <div className='flex flex-col xs:flex-row gap-2 md:gap-4 mt-4 lg:mt-7'>
                  {subtitle &&
                      <div className='block'>
                        <PrismicRichText field={subtitle} components={{
                          label: ({children, node}) => {
                            if(node && node.data && node.data.label && node.data.label.includes("Highlight")){
                              return <HilightText>{children}</HilightText>
                            }
                            return <span className={node.data.label}>{children}</span>}
                          }} />
                      </div>
                  }
                </div>
                {linkText &&
                  <span className='text-jw-green-1 tracking-xl mt-20 font-bold hidden md:block'>{linkText}</span>
                }
                {(link && link.link_type !== "Any") &&
                  <LinkWrapper link={link} className="mt-8 lg:mt-12 w-max block">
                    <div className='w-3 md:w-6 h-max'>
                      <Icon icon="arrow-btn" />
                    </div>
                  </LinkWrapper>
                }
                </div>
            </div>
            <style jsx>{`
              .hero-products__bg {
                background-image : url(${sliceImage.url});    
                clip-path: url(#trazado);
              }
              @media (max-width: 1024px) {
                .hero-products__bg {
                  clip-path: url(#trazado_m);
                }
              }
              @media (max-width: 640px) {
                .hero-products__bg {
                  background-image : url(${mobileImage.url});
                }
              }
          `}</style>
       </section>
    )
}

export default HeroProducts
