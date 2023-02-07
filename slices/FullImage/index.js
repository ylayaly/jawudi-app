import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import Image from 'next/image'
import * as prismicH from '@prismicio/helpers'

const FullImage = ({ slice }) => {
  const sliceImg = slice.primary.image
  const srcImage = prismicH.asImageSrc(sliceImg)

  return (
    <section className='richtext px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 my-4 lg:my-6 xxl:my-14'>
      <div className='3xl:container mx-auto font-lato text-jw-gray-2 p-post'>
        {(sliceImg && sliceImg.url) &&
          <Image src={srcImage} alt={sliceImg.alt} width={sliceImg.dimensions.width} height={sliceImg.dimensions.height}/>
        }
        <div className='sm:flex gap-8 justify-between pt-2 lg:pt-4 xxl:pt-6'>
          <div className='caption'><PrismicRichText field={slice.primary.caption}/></div>
          <div className='w-2/6 xl:w-1/5 sm:text-right font-medium text-1.5'>{slice.primary.credit}</div>
        </div>
      </div>
    </section>
)}

export default FullImage