import React from 'react'
import Image from 'next/image'
import { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/react'
import ArrowWhite from '../../assets/img/arrow-white.svg'
import Link from 'next/link'
import LinkWrapper from '../../components/LinkWrapper'

const HeroIdeas = ({ slice }) => {
  const { title, subtitle } = slice.primary
  const sliceImg = slice.primary.img
  const sliceLink = slice.primary.link

  return (
    <section className='hero-post-list'>
      <div className='relative bg-jw-dark-blue overflow-hidden'>
        
        <div className='relative grid grid-cols-2 items-center md:items-end 3xl:container pl-9 md:px-12 lg:px-20 xl:px-24 3xl:px-0 mx-auto pt-46 lg:pt-44 2xl:pt-48 pb-8 sm:pb-16  '>
          <div className='hero__richtext text-white font-semibold'>
              { title &&
                <PrismicRichText field={title} />
              }
              { subtitle &&
                <div className='hero-post-list__subtitle text-jw-turquoise-4 mt-2 md:mt-0'>
                  <PrismicRichText field={subtitle} />
                </div>
              }
              
              { (sliceLink && sliceLink.link_type !== "Any") &&
                <LinkWrapper link={sliceLink} className="mt-8 xxl:mt-12 2xl:mt-16 hidden md:inline-block">
                  <div className='transform -rotate-90 w-max h-max'>
                    <Image src={ArrowWhite} alt="" />
                  </div>
                </LinkWrapper>
              }
              
          </div>
          <div className='w-full md:w-3/4 ml-auto overflow-hidden'>
            <PrismicImage field={sliceImg} className="ml-4 md:ml-0 object-cover h-auto" />
          </div>
        </div>
        <div className='absolute w-10/12 3xl:w-9/12 right-0 top-0 h-[30%] md:h-[40%] lg:h-[35%] xl:h-[40%] xxl:h-[35%] 3xl:h-[45%] hero-post-list__bg bg-cover bg-left-bottom hidden md:block'></div>
      </div>
    </section>
  )}

export default HeroIdeas