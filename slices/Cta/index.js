import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import LinkWrapper from '../../components/LinkWrapper'

/**
 * @typedef {import("@prismicio/client").Content.CtaSlice} CtaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CtaSlice>} CtaProps
 * @param { CtaProps }
 */
const Cta = ({ slice }) => {
  const { image, overlay_color, content, text_link, link } = slice.primary

  return (<section className='cta relative font-neutrafaceText font-book text-white md:pb-18 xl:pb-28 2xl:pb-32 3xl:pb-44 4xl:pb-52'>
    <div className='absolute inset-0 bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(${image?.url})` }}></div>
    <div className='absolute inset-0 opacity-80' style={{background: overlay_color}}></div>
    <div className='relative py-14 sm:py-22 lg:py-30 2xl:py-36 hero__richtext px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-0 3xl:container mx-auto'>
      <div className={"mb-9"}>
        <PrismicRichText field={content}  />
      </div>
      <LinkWrapper link={link} className='block w-max text-jw-green-1 hover:text-jw-green-3 text-2xl xl:text-3xl'>
        <span>{text_link}</span>
        <div className='w-full h-1 border-b-3 border-jw-green-1'></div>
      </LinkWrapper>
    </div>
    <div className="hidden md:block absolute -bottom-px right-0 left-0 h-18 xl:h-28 2xl:h-32 3xl:h-44 4xl:h-52 bg-footer z-20"></div>
  </section>
)}

export default Cta