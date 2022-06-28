import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { PrismicRichText } from '@prismicio/react'
import { PrismicLink } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers'

import ArrowWhite from '../../assets/img/arrow-white.svg'
import Icon from '../../components/icon'

const HeroVideo = ({ slice }) => {
  const {title, subtitle, link, TextLink, QRcode, textQRCode, Video} = slice.primary;
  const src = prismicH.asImageSrc(QRcode)
  const hero_image = slice.primary.Image
  const srcImage = prismicH.asImageSrc(hero_image)
  const {width, height} = hero_image.dimensions

  const hero_image_mobile = slice.primary.Image.Mobile
  const srcImageMobile = prismicH.asImageSrc(hero_image_mobile)

  const [showVideo, setShowVideo] = useState(false)
  var srcVideo = Video && Video.embed_url ? Video.embed_url : ''
  srcVideo = srcVideo != "" && srcVideo.includes("www.youtube.com/watch") ? srcVideo.replace("watch?v=", "embed/") : srcVideo

  return <section className='hero-video bg-jw-turquoise-1'>
    <div className=' w-full relative h-auto px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 pt-28 xs:pt-40 sm:pt-64 md:pt-20 xl:pt-32'>
      <div className='hero-video__background absolute inset-0 bottom-auto md:bottom-0 h-full ' ></div>
      <div className='md:grid grid-cols-5 h-full gap-4 lg:gap-8 3xl:container mx-auto'>
        <div className='col-span-3'>
          <div className='relative flex flex-col justify-end h-full items-start'>
              <div className='hero-video__richtext richtext text-white w-full mt-14 xs:mt-18 md:mt-0 text-center md:text-left xs:w-3/4 md:w-full mx-auto'>
                {title &&
                  <PrismicRichText field={title}/>
                }
                {subtitle &&
                  <div className='opacity-90 mt-3 xl:mt-8'><PrismicRichText field={subtitle}/></div>
                }
                <div className='hidden md:block mt-12 xl:mt-16 w-max max-w-full'>
                  {(link && link.link_type !== "Any") ?
                    <PrismicLink field={link}>
                      <span className='text-jw-green-1 font-medium text-xs sm:text-base lg:text-lg 3xl:text-2xl tracking-widest'>{TextLink}</span>
                    </PrismicLink>
                    :
                    <span className='text-jw-green-1 font-medium text-xs sm:text-base lg:text-lg 3xl:text-2xl tracking-widest'>{TextLink}</span>
                  }
                  <span className='block w-1/2 bg-jw-green-1 h-1 mt-2'></span>
                </div>
                <div className='hidden md:flex mt-10 xxl:mt-12 3xl:mt-26 mb-10 xxl:mb-14 gap-4 lg:gap-8 items-center'>
                  <div className='w-24 h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 3xl:w-48 3xl:h-48 rounded-lg bg-white p-4 3xl:p-6'>
                    <img src={src} alt={QRcode.alt} />
                  </div>
                  <Image src={ArrowWhite} alt="" />
                  <span className='font-medium opacity-90 text-xl 3xl:text-3xl block w-48'>{textQRCode}</span>
                </div>
              </div>
            </div>
        </div>
        <div className='hero-video__image col-span-2 mt-4 md:mt-0 flex items-end justify-center md:justify-end'>
          <div className='relative'>
            <div className='absolute inset-0 flex justify-center items-center z-10'>
              <button type="button" onClick={() => setShowVideo(true)} className='block w-1/2'><Icon icon='play' /></button>
            </div>
            <div className='hidden md:flex'><Image src={srcImage} alt="" width={width} height={height}/></div>
            <div className='flex md:hidden'><Image src={srcImageMobile} alt="" width={hero_image_mobile.dimensions.width} height={hero_image_mobile.dimensions.height}/></div>
          </div>
        </div>
      </div>
    </div>
    <div className='hero-video__vision block md:hidden w-full h-56 xs:mt-24 pt-24'>
          <button type="button" onClick={() => setShowVideo(true)} className='flex justify-between text-white items-center border border-white rounded-full py-2 px-3 mx-auto text-xxs font-medium'>
              <span className='mr-2'>THE JAWUDI VISION </span>
              <span className='block w-3 h-3'><Icon icon='play' /></span>
          </button>
    </div>
    {srcVideo !== "" && 
      <div className={'fixed inset-0 z-30 transition-opacity flex justify-center items-center ' + (showVideo ? 'opacity-100' : 'opacity-0 hidden')}>
          <div onClick={() => setShowVideo(false)} className='absolute inset-0 bg-black opacity-80 w-full h-full'></div>
          <div className='relative w-full max-w-4xl bg-black p-4'>
            <iframe className='w-full aspect-video aspect-h-9' src={srcVideo} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
      </div>}
  </section>
}

export default HeroVideo